# 🧪 CodeONE Multi-Tier Testing Strategy

> **Testing Pyramid:** Unit Tests, Integration Tests, REST API Tests, Security Checklist Tests, Adapter Fixture Tests, and Frontend Component Tests.  
> **Source of Truth:** CodeONE Technical Documentation (Chapter 16)

---

## 🏛️ 1. Verification Domains

1. **Unit Testing (Jest):** Services, utilities, timezone-aware streak sliding-window algorithms, and cryptographic helpers.
2. **Integration Testing (Jest + PostgreSQL `codeone_test`):** Multi-table Prisma `$transaction` atomicity and constraint validation.
3. **REST API Testing (Supertest):** Verifies all `/api/v1` endpoints, status codes (200, 201, 202, 400, 401, 403, 404, 409, 429), and standard JSON envelopes.
4. **Security & Authorization Testing:** Validates 9-point security checklist (vertical RBAC, horizontal IDOR, token-family reuse revocation, rate limiting).
5. **Platform Adapter Contract Testing:** Contract tests against recorded JSON fixtures simulating 200 OK, 429 rate limits, and 5000ms timeouts—never making live network requests in CI.
6. **Frontend Testing (React Testing Library):** Component rendering, skeletons, and user interaction.

```bash
# Run backend test suites
npm test --workspace=server

# Run test coverage
npm run test:coverage --workspace=server
```

