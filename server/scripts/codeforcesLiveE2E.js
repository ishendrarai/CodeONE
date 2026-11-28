require('dotenv').config();

const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');
const app = require('../src/app');
const prisma = require('../src/config/database');
const { signAccessToken } = require('../src/utils/jwt');

const stateFile = process.env.CODEONE_E2E_STATE_FILE
  || path.join(os.tmpdir(), 'codeone-codeforces-e2e-state.json');

function assertSafeEnvironment() {
  if (process.env.CODEONE_E2E_CONFIRM !== 'YES') {
    throw new Error('Set CODEONE_E2E_CONFIRM=YES to run the live Codeforces E2E check.');
  }
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL must point to a dedicated test database.');
  }

  let databaseName;
  try {
    databaseName = decodeURIComponent(new URL(process.env.DATABASE_URL).pathname.slice(1));
  } catch {
    throw new Error('DATABASE_URL is not a valid PostgreSQL connection URL.');
  }
  if (!/(test|e2e)/i.test(databaseName)) {
    throw new Error('Refusing to run against a database whose name does not include "test" or "e2e".');
  }
}

async function withApi(userId, action) {
  const server = app.listen(0, '127.0.0.1');
  try {
    await new Promise((resolve, reject) => {
      server.once('listening', resolve);
      server.once('error', reject);
    });

    const address = server.address();
    const baseUrl = `http://127.0.0.1:${address.port}/api/v1`;
    const token = signAccessToken({ sub: userId, role: 'user', sid: 'live-e2e' });
    const request = async (endpoint, method, body) => {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          ...(body ? { 'Content-Type': 'application/json' } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(`${method} ${endpoint} failed (${response.status}): ${payload.error.message}`);
      }
      return payload.data;
    };

    return await action(request);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

async function prepare() {
  const handle = process.env.CODEFORCES_E2E_HANDLE;
  if (!handle) {
    throw new Error('Set CODEFORCES_E2E_HANDLE to a Codeforces handle you control.');
  }
  if (fs.existsSync(stateFile)) {
    throw new Error(`An E2E state file already exists at ${stateFile}; verify or remove that state first.`);
  }

  let user;
  try {
    user = await prisma.user.create({
      data: {
        name: 'Codeforces E2E',
        email: `codeforces-e2e-${crypto.randomUUID()}@example.invalid`,
      },
      select: { id: true },
    });
    const account = await withApi(user.id, (request) => request('/platform-accounts', 'POST', {
      platform: 'codeforces',
      username: handle,
    }));
    const state = {
      userId: user.id,
      accountId: account.id,
      handle,
      expiresAt: account.verificationExpiresAt,
    };
    fs.writeFileSync(stateFile, JSON.stringify(state), { flag: 'wx' });
    console.log(`Temporary verification code: ${account.verificationCode}`);
    console.log('Place it in the Codeforces profile city or organization field.');
    console.log(`After updating the profile, run the verify phase. Temporary state: ${stateFile}`);
  } catch (error) {
    if (user) {
      await prisma.user.deleteMany({ where: { id: user.id } });
    }
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function verify() {
  if (!fs.existsSync(stateFile)) {
    throw new Error(`No prepared E2E state found at ${stateFile}; run the prepare phase first.`);
  }
  const verificationCode = process.env.CODEONE_E2E_VERIFICATION_CODE;
  if (!/^[a-f0-9]{64}$/i.test(verificationCode || '')) {
    throw new Error('Set CODEONE_E2E_VERIFICATION_CODE to the temporary code from the prepare phase.');
  }

  const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
  if (new Date(state.expiresAt) <= new Date()) {
    throw new Error('The one-time challenge expired; remove the profile code and prepare a new run.');
  }

  try {
    await withApi(state.userId, async (request) => {
      const ownership = await request(
        `/platform-accounts/${state.accountId}/verify`,
        'POST',
        { verificationCode }
      );
      if (!ownership.verified || ownership.verificationStatus !== 'verified') {
        throw new Error('Codeforces did not confirm ownership. Check the profile field and prepare a new run.');
      }

      const queued = await request(`/sync/platform-accounts/${state.accountId}`, 'POST');
      const deadline = Date.now() + 45_000;
      let completedLog;
      while (Date.now() < deadline) {
        const logs = await request(`/sync/logs?platformAccountId=${state.accountId}`, 'GET');
        completedLog = logs.find((log) => log.id === queued.syncLogId);
        if (completedLog && completedLog.status !== 'running') {
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      if (!completedLog || completedLog.status !== 'success') {
        throw new Error(
          `Sync did not succeed: ${completedLog ? completedLog.errorMessage || completedLog.status : 'timed out'}`
        );
      }

      const linkedAccounts = await request('/platform-accounts', 'GET');
      const syncedAccount = linkedAccounts.find((item) => item.id === state.accountId);
      if (!syncedAccount || !syncedAccount.lastSynced) {
        throw new Error('Sync log succeeded but the account profile snapshot was not updated.');
      }
      console.log(`PASS: ownership verified for ${state.handle}; sync ${completedLog.id} completed.`);
      console.log(`Sync result: ${completedLog.status}, recordsFetched=${completedLog.recordsFetched}.`);
      console.log('Remove the temporary code from the Codeforces profile now.');
    });
  } finally {
    try {
      await prisma.user.deleteMany({ where: { id: state.userId } });
    } finally {
      fs.rmSync(stateFile, { force: true });
      await prisma.$disconnect();
    }
  }
}

async function main() {
  assertSafeEnvironment();
  const phase = process.argv[2];
  if (phase === 'prepare') {
    await prepare();
    return;
  }
  if (phase === 'verify') {
    await verify();
    return;
  }
  throw new Error('Usage: npm run test:e2e:codeforces -- <prepare|verify>');
}

main().catch((error) => {
  console.error(`[Live E2E Failed] ${error.message}`);
  process.exitCode = 1;
});
