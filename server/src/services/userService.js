/**
 * src/services/userService.js
 * Layer: Services / Domain Logic
 * Responsibility: Manages user profile retrieval, settings updates, and linked platform summaries.
 * Interaction: Invoked by userController; interacts with Prisma database (users, platform_accounts).
 */

const prisma = require('../config/database');
const { ERROR_CODES } = require('../utils/constants');
const { userProfileUpdateSchema } = require('../utils/validators');

const SAFE_USER_SELECT = {
  id: true,
  name: true,
  email: true,
  avatarUrl: true,
  role: true,
  emailVerified: true,
  createdAt: true,
  lastLogin: true,
  settings: true,
  platformAccounts: {
    select: {
      id: true,
      platformName: true,
      username: true,
      verificationStatus: true,
      lastSynced: true,
      isActive: true,
    },
  },
};

function createServiceError(message, statusCode, code, details) {
  const err = new Error(message);
  err.statusCode = statusCode;
  err.code = code;
  if (details) err.details = details;
  return err;
}

async function getUserProfile(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: SAFE_USER_SELECT,
  });

  if (!user) {
    throw createServiceError('User not found.', 404, ERROR_CODES.NOT_FOUND);
  }

  return user;
}

async function updateUserSettings(userId, updateData) {
  const { error, value } = userProfileUpdateSchema.validate(updateData, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    throw createServiceError(
      'Invalid profile update payload.',
      400,
      ERROR_CODES.VALIDATION_ERROR,
      error.details.map((d) => d.message)
    );
  }

  const existing = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, settings: true },
  });

  if (!existing) {
    throw createServiceError('User not found.', 404, ERROR_CODES.NOT_FOUND);
  }

  const data = {};
  if (value.name !== undefined) data.name = value.name;
  if (value.avatarUrl !== undefined) {
    data.avatarUrl = value.avatarUrl === '' ? null : value.avatarUrl;
  }
  if (value.settings !== undefined) {
    const currentSettings =
      existing.settings && typeof existing.settings === 'object' ? existing.settings : {};
    data.settings = { ...currentSettings, ...value.settings };
  }

  return prisma.user.update({
    where: { id: userId },
    data,
    select: SAFE_USER_SELECT,
  });
}

module.exports = {
  getUserProfile,
  updateUserSettings,
};
