/**
 * src/controllers/authController.js
 * Layer: Controllers / HTTP Transport
 * Responsibility: HTTP handlers for email/password and OAuth authentication workflows.
 */

const authService = require('../services/authService');

const COOKIE_NAME = 'refreshToken';
const COOKIE_PATH = '/api/v1/auth';

function refreshCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: COOKIE_PATH,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}

function setRefreshCookie(res, token) {
  res.cookie(COOKIE_NAME, token, refreshCookieOptions());
}

function clearRefreshCookie(res) {
  res.clearCookie(COOKIE_NAME, refreshCookieOptions());
}

function requestMetadata(req) {
  return { ip: req.ip, userAgent: req.get('user-agent') };
}

function sendSession(res, status, result) {
  setRefreshCookie(res, result.refreshToken);
  return res.status(status).json({
    success: true,
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
}

async function register(req, res, next) {
  try {
    const result = await authService.register(req.body, requestMetadata(req));
    return sendSession(res, 201, result);
  } catch (err) {
    return next(err);
  }
}

async function login(req, res, next) {
  try {
    const result = await authService.login(req.body, requestMetadata(req));
    return sendSession(res, 200, result);
  } catch (err) {
    if (err.retryAfterSeconds) res.set('Retry-After', String(err.retryAfterSeconds));
    return next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const result = await authService.refreshSession(req.cookies?.[COOKIE_NAME], requestMetadata(req));
    setRefreshCookie(res, result.refreshToken);
    return res.status(200).json({
      success: true,
      data: { accessToken: result.accessToken },
    });
  } catch (err) {
    if (err.clearCookie) clearRefreshCookie(res);
    return next(err);
  }
}

async function logout(req, res, next) {
  try {
    await authService.logout(
      req.cookies?.[COOKIE_NAME],
      req.user?.id,
      req.user?.sessionId,
      requestMetadata(req)
    );
    clearRefreshCookie(res);
    return res.status(200).json({ success: true, message: 'Logged out successfully.' });
  } catch (err) {
    return next(err);
  }
}

async function oauthComplete(req, res, next) {
  try {
    const result = await authService.handleOAuthLogin(req.user.provider, req.user, requestMetadata(req));
    setRefreshCookie(res, result.refreshToken);
    const callbackUrl = new URL(
      '/auth/callback',
      process.env.FRONTEND_URL || process.env.CLIENT_URL || 'http://localhost:5173'
    );
    callbackUrl.hash = new URLSearchParams({ access_token: result.accessToken }).toString();
    return res.redirect(callbackUrl.toString());
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  register,
  signup: register,
  login,
  refresh,
  logout,
  oauthComplete,
  clearRefreshCookie,
};
