#!/usr/bin/env bash
# ==============================================================================
# scripts/setup.sh - CodeONE Local Development Environment Setup Script
# Responsibility: Prepares local development dependencies and workspaces.
# ==============================================================================

set -e

echo "=== Initializing CodeONE Development Environment ==="
echo "Node Version: $(node -v)"
echo "NPM Version: $(npm -v)"

# Install workspace root dependencies
echo "Installing workspace dependencies..."
npm install

echo "=== Setup completed successfully ==="
