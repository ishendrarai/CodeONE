# CodeONE API

Base URL: `http://localhost:5000/api/v1`

The endpoints below require `Authorization: Bearer <access-token>` unless marked otherwise. JSON responses use a success envelope:

```json
{
  "success": true,
  "data": {}
}
```

Errors use `{ "success": false, "error": { "code": "...", "message": "..." } }`.

## Platform accounts

Phase 1 supports Codeforces account linking and profile sync. No Codeforces password or cookie is requested or stored.

### `GET /platform-accounts`

Returns the caller's linked accounts. Verification hashes and challenge codes are never included.

```json
{
  "success": true,
  "data": [
    {
      "id": "7ebd8a0a-5e76-4f15-9c89-546f0aad49dd",
      "platformName": "codeforces",
      "username": "tourist",
      "verificationStatus": "verified",
      "verifiedAt": "2026-11-27T04:20:00.000Z",
      "rating": 3850,
      "rank": "legendary grandmaster",
      "lastSynced": "2026-11-27T04:22:00.000Z",
      "isActive": true,
      "syncFrequency": 3600
    }
  ]
}
```

### `POST /platform-accounts`

Links a Codeforces handle and creates a 15-minute ownership challenge. The one-time code is returned only in this response; the database stores its SHA-256 hash.

Request:

```json
{
  "platform": "codeforces",
  "username": "tourist"
}
```

Response: `201 Created`

```json
{
  "success": true,
  "data": {
    "id": "7ebd8a0a-5e76-4f15-9c89-546f0aad49dd",
    "platformName": "codeforces",
    "username": "tourist",
    "verificationStatus": "unverified",
    "isActive": true,
    "syncFrequency": 3600,
    "verificationCode": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
    "verificationExpiresAt": "2026-11-27T04:35:00.000Z"
  }
}
```

Place the exact code in a public Codeforces profile field exposed by `user.info` (for example, `city` or `organization`), then submit it for verification. Remove the code from the profile after verification.

### `POST /platform-accounts/:id/verify`

Verifies the caller-owned account. Send the one-time code from the link response:

```json
{
  "verificationCode": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
}
```

Response: `200 OK`

```json
{
  "success": true,
  "data": {
    "id": "7ebd8a0a-5e76-4f15-9c89-546f0aad49dd",
    "platformName": "codeforces",
    "username": "tourist",
    "verificationStatus": "verified",
    "verifiedAt": "2026-11-27T04:20:00.000Z",
    "rating": 3850,
    "rank": "legendary grandmaster",
    "isActive": true,
    "syncFrequency": 3600,
    "verified": true
  }
}
```

To replace a missing or expired challenge, send `{}` to the same endpoint. A new code and expiry are returned. Invalid codes return `400`; expired codes return `409`. If Codeforces does not show the valid challenge in a public profile field, verification returns `verified: false` and marks the attempt `failed`; request a new code with `{}` to retry. A handle already verified by another account returns `409`.

### `DELETE /platform-accounts/:id`

Unlinks an account owned by the caller and cascades its sync logs. Returns `200` with:

```json
{
  "success": true,
  "message": "Platform account unlinked."
}
```

## Sync

Sync requests are asynchronous. Phase 1 fetches and stores the public Codeforces profile snapshot (rating and rank); bulk submission/rating-history ingestion is a later phase.

### `POST /sync/platform-accounts/:id`

Queues a sync for an active, verified account owned by the caller.

Response: `202 Accepted`

```json
{
  "success": true,
  "data": {
    "syncLogId": "865a9f29-638f-49fd-b7ef-a08af4288394",
    "status": "running",
    "alreadyRunning": false
  }
}
```

If a sync is already running for that account, its log ID is returned and no duplicate job is started.

### `POST /sync/platform-accounts`

Queues syncs for all active, verified accounts owned by the caller. Returns `202 Accepted` with `enqueuedCount` and a `syncs` array containing each log ID and status.

### `GET /sync/logs`

Returns up to the latest 50 sync logs belonging to the caller. Optionally filter by `platformAccountId`:

```text
GET /sync/logs?platformAccountId=7ebd8a0a-5e76-4f15-9c89-546f0aad49dd
```

Example response:

```json
{
  "success": true,
  "data": [
    {
      "id": "865a9f29-638f-49fd-b7ef-a08af4288394",
      "platformAccountId": "7ebd8a0a-5e76-4f15-9c89-546f0aad49dd",
      "status": "success",
      "startedAt": "2026-11-27T04:21:00.000Z",
      "finishedAt": "2026-11-27T04:21:02.000Z",
      "recordsFetched": 1,
      "errorMessage": null
    }
  ]
}
```

The status is `running`, `success`, `failed`, or `rate_limited`. Poll this endpoint using the returned `syncLogId` as the log `id`.

## Common errors

| HTTP | Code | Meaning |
| --- | --- | --- |
| `400` | `VALIDATION_ERROR` | Invalid request or verification code |
| `401` | `AUTHENTICATION_ERROR` | Missing or invalid access token |
| `404` | `NOT_FOUND` | Account/log target does not exist or is not owned by the caller |
| `409` | `CONFLICT` | Duplicate link, expired challenge, or account is not eligible for sync |
| `429` | `RATE_LIMIT_EXCEEDED` | Codeforces rate limit was reached |
| `502` | `SOURCE_UNAVAILABLE` | Codeforces API is unavailable or returned an unsuccessful response |

## Live Codeforces end-to-end check

The opt-in live check uses a real PostgreSQL database and the official Codeforces API. It creates a temporary CodeONE user and account, then runs in two phases so you can add the challenge code to the profile between commands. The verification phase removes the temporary database user and linked account.

Run only against a dedicated test database whose database name contains `test` or `e2e`, from the `server` directory:

```powershell
$env:DATABASE_URL = "postgresql://<user>:<password>@localhost:5432/codeone_e2e"
$env:CODEONE_E2E_CONFIRM = "YES"
$env:CODEFORCES_E2E_HANDLE = "a-handle-you-control"
npm run test:e2e:codeforces -- prepare
```

Copy the printed one-time code to the Codeforces profile `city` or `organization` field. Then run:

```powershell
$env:CODEONE_E2E_VERIFICATION_CODE = "<temporary-code>"
npm run test:e2e:codeforces -- verify
```

The database schema and verification migration must already be deployed. The state file contains only temporary test IDs/handle, not the challenge code, and is removed after verification. Remove the code from the public profile when the check completes.

## Authentication and security

The API also exposes signup, login, refresh, logout, and Google/GitHub OAuth endpoints.
Authenticated requests use a bearer access token. Access tokens expire after 15 minutes;
refresh tokens are sent only as an HttpOnly cookie, stored as hashes, and rotated on
refresh. Reuse of a rotated refresh token revokes its token family. Production cookies
are Secure, SameSite=Lax, scoped to `/api/v1/auth`, and expire after seven days.

| Method | Path | Purpose |
|---|---|---|
| POST | `/auth/signup` or `/auth/register` | Create an account |
| POST | `/auth/login` | Authenticate with email and password |
| POST | `/auth/refresh` | Rotate the refresh token and issue an access token |
| POST | `/auth/logout` | Revoke the session and clear the refresh cookie |
| GET | `/auth/google` and `/auth/google/callback` | Google OAuth |
| GET | `/auth/github` and `/auth/github/callback` | GitHub OAuth |
| GET | `/admin/users` | Paginated user list; requires an admin token |
| PATCH | `/admin/users/:id/role` | Update a user's role; requires an admin token |
| GET | `/admin/audit-logs` | Paginated audit logs; requires an admin token |

Passwords must be at least 12 characters and include lowercase, uppercase, a number,
and a symbol. Five consecutive failed password attempts lock the account for 15 minutes.
