/**
 * src/controllers/platformAccountController.js
 * Layer: Controllers / HTTP Transport
 * Responsibility: Handles platform account linking, handle challenge verification, and unlinking.
 * IDOR Protection: Enforces that target account belongs to req.user.sub.
 * Interaction: Receives HTTP request, delegates to platformAccountService.
 */

const platformAccountService = require('../services/platformAccountService');

async function getAccounts(req, res, next) {
  try {
    const accounts = await platformAccountService.getLinkedAccounts(req.user.sub);
    return res.status(200).json({ success: true, data: accounts });
  } catch (err) {
    next(err);
  }
}

async function linkAccount(req, res, next) {
  try {
    const { platform, username } = req.body;
    const account = await platformAccountService.linkAccount(req.user.sub, platform, username);
    return res.status(201).json({ success: true, data: account });
  } catch (err) {
    next(err);
  }
}

async function verifyAccount(req, res, next) {
  try {
    const result = await platformAccountService.verifyAccountOwnership(
      req.user.sub,
      req.params.id,
      req.body.verificationCode
    );
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function unlinkAccount(req, res, next) {
  try {
    await platformAccountService.unlinkAccount(req.user.sub, req.params.id);
    return res.status(200).json({ success: true, message: 'Platform account unlinked.' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAccounts,
  linkAccount,
  verifyAccount,
  unlinkAccount,
};

