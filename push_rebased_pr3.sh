#!/bin/bash

# Script to push the rebased PR #3 branch
# This completes the rebase work done by Copilot

set -e  # Exit on error

echo "================================================"
echo "  Pushing Rebased PR #3 to GitHub"
echo "================================================"
echo ""

# Check if we're in the right directory
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    echo "Please run this script from the repository root"
    exit 1
fi

# Check if pr3-branch exists
if ! git rev-parse --verify pr3-branch >/dev/null 2>&1; then
    echo "❌ Error: pr3-branch not found"
    echo "The rebased branch should be available locally"
    exit 1
fi

echo "✅ Found rebased pr3-branch"
echo ""

# Show the current state
echo "Current branch commits:"
git log pr3-branch --oneline -5
echo ""

# Ask for confirmation
echo "This will push the rebased branch to:"
echo "  origin/copilot/accessibility-improvements-wcag-2-1"
echo ""
echo "This uses --force-with-lease to safely overwrite the remote branch"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Push cancelled"
    exit 1
fi

echo ""
echo "🚀 Pushing to GitHub..."
echo ""

# Checkout the branch
git checkout pr3-branch

# Push with force-with-lease (safe force push)
git push --force-with-lease origin pr3-branch:copilot/accessibility-improvements-wcag-2-1

echo ""
echo "================================================"
echo "  ✅ SUCCESS!"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. Go to https://github.com/js22gz/SafeTXT/pull/3"
echo "2. Verify the PR shows no conflicts"
echo "3. Review and merge the PR"
echo "4. Close PR #4 (see ACTION_ITEMS.md for comment)"
echo "5. Close PR #7 after everything is done"
echo ""
echo "See REBASE_COMPLETE.md for detailed instructions"
echo ""
