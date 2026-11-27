import { describe, expect, it } from 'vitest';
import {
  handleLinkingSchema,
  loginSchema,
  profileTimezoneSchema,
  signupSchema,
} from '../schemas/auth.schema';

const validSignup = {
  name: 'Astha Goswami',
  email: 'astha@example.com',
  handle: 'astha_01',
  password: 'StrongPass123!',
  confirmPassword: 'StrongPass123!',
  timezone: 'Asia/Kolkata',
};

describe('auth schemas', () => {
  it('accepts valid login and signup data and normalizes email casing', () => {
    expect(loginSchema.safeParse({ email: 'ASTHA@example.com', password: 'secret' }).success).toBe(true);

    const result = signupSchema.safeParse({ ...validSignup, email: 'ASTHA@example.com' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('astha@example.com');
    }
  });

  it('rejects malformed email addresses', () => {
    expect(loginSchema.safeParse({ email: 'not-an-email', password: 'secret' }).success).toBe(false);
    expect(signupSchema.safeParse({ ...validSignup, email: 'missing-at-sign.test' }).success).toBe(false);
  });

  it('rejects weak passwords and mismatched confirmations', () => {
    expect(signupSchema.safeParse({ ...validSignup, password: 'weak' }).success).toBe(false);

    const result = signupSchema.safeParse({
      ...validSignup,
      confirmPassword: 'DifferentPass123!',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path.includes('confirmPassword'))).toBe(true);
    }
  });

  it('rejects invalid IANA timezones', () => {
    expect(
      signupSchema.safeParse({ ...validSignup, timezone: 'Not/A_Timezone' }).success,
    ).toBe(false);
    expect(
      profileTimezoneSchema.safeParse({
        displayName: 'Astha',
        bio: '',
        timezone: 'Not/A_Timezone',
      }).success,
    ).toBe(false);
  });

  it('validates platform enum and handle format boundaries', () => {
    expect(handleLinkingSchema.safeParse({ platform: 'codewars', username: 'a.' }).success).toBe(true);
    expect(handleLinkingSchema.safeParse({ platform: 'unknown', username: 'astha_01' }).success).toBe(false);
    expect(handleLinkingSchema.safeParse({ platform: 'codechef', username: 'astha_01' }).success).toBe(false);
    expect(handleLinkingSchema.safeParse({ platform: 'leetcode', username: 'x' }).success).toBe(false);
    expect(handleLinkingSchema.safeParse({ platform: 'codeforces', username: 'bad handle' }).success).toBe(false);
    expect(handleLinkingSchema.safeParse({ platform: 'atcoder', username: 'a'.repeat(101) }).success).toBe(false);
  });
});
