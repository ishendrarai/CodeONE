module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'script',
  },
  extends: ['eslint:recommended'],
  ignorePatterns: ['node_modules/', 'dist/', 'coverage/', '*.d.ts'],
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
  },
  overrides: [
    {
      files: ['server/tests/**/*.js'],
      env: {
        jest: true,
      },
    },
    {
      // Teammate-owned Phase 2 stubs & server bootstrap: warn only (do not edit out-of-scope files)
      files: [
        'server/src/server.js',
        'server/src/jobs/*.js',
        'server/src/services/analyticsService.js',
        'server/src/services/contestService.js',
        'server/src/services/goalService.js',
        'server/src/services/notificationService.js',
        'server/src/services/problemService.js',
        'server/src/services/streakService.js',
        'server/src/services/submissionService.js',
        'server/src/services/weaknessDetectionService.js',
      ],
      rules: {
        'no-unused-vars': 'warn',
        'no-inner-declarations': 'warn',
      },
    },
    {
      files: ['client/**/*.js', 'client/**/*.jsx'],
      env: {
        browser: true,
        node: false,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      plugins: ['react'],
      rules: {
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        // Teammate-owned frontend mock UI contains scaffolded unused imports/empty catches
        'no-unused-vars': 'warn',
        'no-empty': 'warn',
        'no-constant-condition': 'warn',
      },
    },
  ],
};
