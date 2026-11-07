#!/usr/bin/env bash
# ==============================================================================
# scripts/migrate.sh - Database Migration Automation Script
# Responsibility: Runs Prisma schema migrations against target PostgreSQL database.
# ==============================================================================

set -e

echo "=== Running CodeONE Prisma Database Migrations ==="

# Execute migration in server workspace
npm run prisma:migrate --workspace=server

echo "=== Database migrations applied successfully ==="
