#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Build completed - browsers will be installed on first run"
echo "Note: Playwright browsers will be installed automatically when needed" 