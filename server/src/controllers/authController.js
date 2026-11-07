/**
 * src/controllers/authController.js
 * Layer: Controllers / HTTP Transport
 * Responsibility: Thin HTTP handlers for authentication workflows: registration,
 *                 login, session refresh, logout, and OAuth 2.0 callbacks.
 * Interaction: Receives HTTP request, delegates business logic to authService, returns JSON.
 */

const authService = require('../services/authService');

async function register(req, res, next) {
  try {
    const result = await authService.register(req.body);
    return res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const result = await authService.login(req.body, { ip: req.ip, userAgent: req.headers['user-agent'] });
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const result = await authService.refreshSession(refreshToken);
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    await authService.logout(req.user?.sid, req.user?.sub);
    res.clearCookie('refreshToken');
    return res.status(200).json({ success: true, message: 'Logged out successfully.' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
  refresh,
  logout,
};
