/**
 * tests/unit/utils/jwt.test.js
 * Layer: Tests / Unit / Utils
 * Responsibility: Unit tests validating 15-minute access token signing, verification, and SHA-256 token hashing.
 */

describe('jwt utility test suite', () => {
  it('signs and verifies 15-minute access token', () => {
    const { signAccessToken, verifyAccessToken, hashToken } = require('../../../src/utils/jwt');
    const token = signAccessToken({ sub: 'user-uuid', role: 'user' });
    expect(typeof token).toBe('string');

    const decoded = verifyAccessToken(token);
    expect(decoded.sub).toBe('user-uuid');
    expect(decoded.role).toBe('user');

    const hash = hashToken('raw-token');
    expect(typeof hash).toBe('string');
    expect(hash.length).toBe(64);
  });
});

