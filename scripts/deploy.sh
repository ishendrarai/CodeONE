#!/usr/bin/env bash
# ==============================================================================
# scripts/deploy.sh - Staged Deployment Script
# Responsibility: Orchestrates production build and migration release steps.
# ==============================================================================

set -e

echo "=== Deploying CodeONE ==="

# Build client and server
npm run build

echo "=== Release build prepared ==="
