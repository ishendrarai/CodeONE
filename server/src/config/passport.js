/**
 * src/config/passport.js
 * Layer: Configuration / Authentication
 * Responsibility: Configures Passport.js OAuth 2.0 strategies (Google & GitHub)
 *                 enforcing verified-email account linking requirements.
 * Interaction: Invoked during Express initialization in app.js and used in authRoutes.js.
 */

const passport = require('passport');
const axios = require('axios');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

function callbackUrl(provider, legacyVariable) {
  if (process.env[legacyVariable]) return process.env[legacyVariable];
  if (process.env.OAUTH_CALLBACK_BASE_URL) {
    return `${process.env.OAUTH_CALLBACK_BASE_URL.replace(/\/$/, '')}/${provider}/callback`;
  }
  return undefined;
}

function configurePassport() {
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: callbackUrl('google', 'GOOGLE_CALLBACK_URL'),
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = (profile.emails || []).find((entry) => entry.verified);
            return done(null, {
              provider: 'google',
              providerUserId: profile.id,
              email: email?.value,
              emailVerified: Boolean(email?.verified),
              name: profile.displayName,
              avatarUrl: profile.photos?.[0]?.value,
            });
          } catch (err) {
            return done(err);
          }
        }
      )
    );
  }

  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    passport.use(
      new GitHubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          callbackURL: callbackUrl('github', 'GITHUB_CALLBACK_URL'),
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const response = await axios.get('https://api.github.com/user/emails', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/vnd.github+json',
              },
              timeout: 5000,
            });
            const email = response.data.find((entry) => entry.primary && entry.verified);
            return done(null, {
              provider: 'github',
              providerUserId: profile.id,
              email: email?.email,
              emailVerified: Boolean(email),
              name: profile.displayName || profile.username,
              avatarUrl: profile.photos?.[0]?.value,
            });
          } catch (err) {
            return done(err);
          }
        }
      )
    );
  }

  return passport;
}

module.exports = configurePassport;
