const crypto = require('crypto');

const COOKIE_PATH = '/api/v1/auth';

function stateCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: COOKIE_PATH,
    maxAge: 10 * 60 * 1000,
  };
}

function createOAuthState(provider) {
  return (req, res, next) => {
    const state = crypto.randomBytes(32).toString('hex');
    res.cookie(`oauth_${provider}_state`, state, stateCookieOptions());
    req.oauthState = state;
    next();
  };
}

function validateOAuthState(provider) {
  return (req, res, next) => {
    const cookieName = `oauth_${provider}_state`;
    const expected = req.cookies?.[cookieName] || '';
    const supplied = typeof req.query.state === 'string' ? req.query.state : '';
    res.clearCookie(cookieName, stateCookieOptions());

    const expectedBytes = Buffer.from(expected);
    const suppliedBytes = Buffer.from(supplied);
    if (
      !expected ||
      expectedBytes.length !== suppliedBytes.length ||
      !crypto.timingSafeEqual(expectedBytes, suppliedBytes)
    ) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'OAUTH_STATE_INVALID',
          message: 'OAuth state validation failed.',
        },
      });
    }
    return next();
  };
}

module.exports = { createOAuthState, validateOAuthState };
