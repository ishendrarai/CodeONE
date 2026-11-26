# 🛠️ CodeONE Development Setup Guide

> **Prerequisites:** Node.js 22+ LTS, npm 10+, PostgreSQL 15+, Git (latest). Optional: Redis 7+, Docker.

---

## 🚀 1. Local Workspace Setup

```bash
# 1. Clone repository
git clone https://github.com/ishendrarai/CodeONE.git
cd CodeONE

# 2. Install dependencies across workspaces
npm install

# 3. Setup environment files
cp server/.env.example server/.env
cp client/.env.example client/.env

# 4. Generate Prisma Client and apply migrations
npm run prisma:generate --workspace=server
npm run prisma:migrate --workspace=server

# 5. (Optional) Seed development data
npm run seed --workspace=server

# 6. Start development servers concurrently
npm run dev
```

* **Frontend:** http://localhost:5173
* **Backend API:** http://localhost:5000/api/v1
* **Health Probe:** http://localhost:5000/api/v1/health

