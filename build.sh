#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Setting up Playwright environment..."
# Create cache directory for Playwright
mkdir -p /opt/render/project/src/.cache/ms-playwright

# Set environment variables for Playwright
export PLAYWRIGHT_BROWSERS_PATH=/opt/render/project/src/.cache/ms-playwright
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=0

echo "Installing Playwright browsers..."
# Install Chromium with dependencies
python -m playwright install --with-deps chromium

echo "Build completed successfully!" 