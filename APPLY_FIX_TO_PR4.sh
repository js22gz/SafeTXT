#!/bin/bash
# Script to apply the conflict resolution to PR #4

set -e

echo "This script will apply the conflict resolution to PR #4"
echo "Choose your method:"
echo "1. Copy resolved file from this PR"
echo "2. Cherry-pick the resolution commit"
echo "3. Apply patch file"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
  1)
    echo "Fetching resolved file..."
    curl -sL "https://raw.githubusercontent.com/js22gz/SafeTXT/copilot/resolve-current-pr-conflicts/index.html" > index.html
    echo "✓ File updated"
    echo "Now run:"
    echo "  git add index.html"
    echo "  git commit -m 'Merge PR #5 performance improvements with error handling'"
    echo "  git push"
    ;;
  2)
    echo "Cherry-picking resolution commit..."
    git cherry-pick 55a55e3
    echo "✓ Commit cherry-picked"
    echo "Now run: git push"
    ;;
  3)
    if [ ! -f /tmp/pr4-conflict-resolution.patch ]; then
      echo "Downloading patch file..."
      curl -sL "https://github.com/js22gz/SafeTXT/compare/1719cc5...55a55e3.patch" > /tmp/pr4-conflict-resolution.patch
    fi
    echo "Applying patch..."
    git apply /tmp/pr4-conflict-resolution.patch
    echo "✓ Patch applied"
    echo "Now run:"
    echo "  git add ."
    echo "  git commit -m 'Merge PR #5 performance improvements with error handling'"
    echo "  git push"
    ;;
  *)
    echo "Invalid choice"
    exit 1
    ;;
esac

echo ""
echo "After pushing, verify PR #4 shows 'mergeable: true'"
