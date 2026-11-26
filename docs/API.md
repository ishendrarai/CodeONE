# Authentication and Security API

Base URL: `http://localhost:5000/api/v1`

Successful JSON responses use `{ "success": true, "data": ... }`. Errors use
`{ "success": false, "error": { "code": "...", "message": "...", "details": ... } }`.
Access tokens are returned in JSON; refresh tokens are only sent as an HttpOnly cookie.
The cookie is Secure in production, SameSite=Lax, scoped to `/api/v1/auth`, and expires
after seven days.

## Endpoints

| Method | Path | Request | Success response |
|---|---|---|---|
| POST | `/auth/signup` | `{ "name", "email", "password" }` | `201`, `{ user, accessToken }`, refresh cookie |
| POST | `/auth/register` | Same as signup (compatibility alias) | Same as signup |
| POST | `/auth/login` | `{ "email", "password" }` | `200`, `{ user, accessToken }`, refresh cookie |
| POST | `/auth/refresh` | Refresh cookie | `200`, `{ accessToken }`, rotated refresh cookie |
| POST | `/auth/logout` | Bearer access token + refresh cookie | `200`, cookie cleared |
| GET | `/auth/google` | Browser redirect | Google OAuth consent |
| GET | `/auth/google/callback` | OAuth callback | Redirect to frontend `/auth/callback#access_token=...` |
| GET | `/auth/github` | Browser redirect | GitHub OAuth consent |
| GET | `/auth/github/callback` | OAuth callback | Redirect to frontend `/auth/callback#access_token=...` |
| GET | `/admin/users?page=1&limit=20` | Admin Bearer token | Paginated users with masked emails |
| PATCH | `/admin/users/:id/role` | `{ "role": "user" \| "admin" }` | Updated user role |
| GET | `/admin/audit-logs?page=1&limit=20&action=LOGIN_FAILED&status=failure&userId=...` | Admin Bearer token | Paginated matching audit logs |

Signup passwords must contain at least 12 characters, including lowercase, uppercase,
a number, and a symbol. Five consecutive failed password attempts lock the account for
15 minutes. Access JWTs last exactly 15 minutes; refresh tokens are random opaque values,
stored only as hashes, and rotated on every refresh. Reusing an old token revokes its
entire token family.

## Verification with curl

Run these commands from PowerShell with `curl.exe`. The examples assume the server is
running and `.env` has been configured.

```powershell
# Signup; save the HttpOnly refresh cookie and capture the access token from JSON.
curl.exe -i -c cookies.txt -H "Content-Type: application/json" `
  -d '{"name":"Test User","email":"test@example.com","password":"StrongPass123!"}' `
  http://localhost:5000/api/v1/auth/signup

# Five incorrect passwords should lock the account on the fifth request (423 + Retry-After).
# Run this after the auth rate-limit window has reset (signup also consumes one auth request).
1..5 | ForEach-Object {
  curl.exe -i -H "Content-Type: application/json" `
    -d '{"email":"test@example.com","password":"WrongPassword123!"}' `
    http://localhost:5000/api/v1/auth/login
}

# Refresh rotates the cookie; replaying the old cookie revokes its whole family.
curl.exe -i -b cookies.txt -c rotated.txt -X POST http://localhost:5000/api/v1/auth/refresh
curl.exe -i -b cookies.txt -X POST http://localhost:5000/api/v1/auth/refresh
curl.exe -i -b rotated.txt -X POST http://localhost:5000/api/v1/auth/refresh

# Promote a test account to admin directly in the development database, then login again:
# UPDATE users SET role = 'admin' WHERE email = 'test@example.com';
# Use the returned accessToken as $ACCESS_TOKEN.
curl.exe -i -H "Authorization: Bearer $ACCESS_TOKEN" `
  http://localhost:5000/api/v1/admin/users?page=1`&limit=20
curl.exe -i -X PATCH -H "Authorization: Bearer $ACCESS_TOKEN" `
  -H "Content-Type: application/json" -d '{"role":"user"}' `
  http://localhost:5000/api/v1/admin/users/USER_UUID/role
```

The second refresh request above intentionally replays the original cookie; the final
refresh should fail because reuse detection revoked the family. To verify RBAC, repeat an
admin request without the access token (`401`), with a normal-user access token (`403`),
and with an admin access token (`200`).
