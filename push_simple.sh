#!/bin/bash

# Simple script to push the rebased PR #3 branch

set -e  # Exit on error

echo "================================================"
echo "  Pushing Rebased PR #3 to GitHub"
echo "================================================"
echo ""
echo "This will run:"
echo "  git push origin pr3-rebased:copilot/accessibility-improvements-wcag-2-1 --force-with-lease"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Push cancelled"
    exit 1
fi

echo ""
echo "🚀 Pushing..."
echo ""

git push origin pr3-rebased:copilot/accessibility-improvements-wcag-2-1 --force-with-lease

echo ""
echo "================================================"
echo "  ✅ SUCCESS!"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. Go to https://github.com/js22gz/SafeTXT/pull/3"
echo "2. Verify the PR shows no conflicts"
echo "3. Click 'Merge pull request'"
echo ""
