import { z } from 'zod';

const isIanaTimezone = (timezone: string) => {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
};

const ianaTimezoneSchema = z
  .string()
  .trim()
  .min(1)
  .refine(isIanaTimezone, 'Enter a valid IANA timezone.');

const handleSchema = z
  .string()
  .trim()
  .min(2)
  .max(100)
  .regex(/^[a-zA-Z0-9_.-]+$/, {
    message: 'Handle may only contain letters, numbers, underscores, hyphens, and dots.',
  });

export const signupSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().email().transform((email) => email.toLowerCase()),
    handle: handleSchema,
    password: z
      .string()
      .min(12)
      .max(128)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
        'Password must include lowercase, uppercase, a number, and a symbol.',
      ),
    confirmPassword: z.string(),
    timezone: ianaTimezoneSchema.optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.string().trim().email().transform((email) => email.toLowerCase()),
  password: z.string().min(1),
});

export const profileTimezoneSchema = z.object({
  displayName: z.string().trim().min(1).max(100),
  bio: z.string().max(2000),
  timezone: ianaTimezoneSchema,
});

export const handleLinkingSchema = z.object({
  platform: z.enum(['codeforces', 'atcoder', 'codewars']),
  username: handleSchema,
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ProfileTimezoneInput = z.infer<typeof profileTimezoneSchema>;
export type HandleLinkingInput = z.infer<typeof handleLinkingSchema>;
