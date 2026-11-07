/**
 * src/config/passport.js
 * Layer: Configuration / Authentication
 * Responsibility: Configures Passport.js OAuth 2.0 strategies (Google & GitHub)
 *                 enforcing verified-email account linking requirements.
 * Interaction: Invoked during Express initialization in app.js and used in authRoutes.js.
 */

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

function configurePassport() {
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
          // Handled via authService.handleOAuthCallback() in Phase 3
          return done(null, profile);
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
          callbackURL: process.env.GITHUB_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
          // Handled via authService.handleOAuthCallback() in Phase 3
          return done(null, profile);
        }
      )
    );
  }

  return passport;
}

module.exports = configurePassport;
