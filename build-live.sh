#!/bin/bash
# build-live.sh — Package zenosite for production deployment
# Creates a zip file with all production transforms applied:
#   - noindex,nofollow → index,follow
#   - robots.txt opened for crawlers
#   - seoplan.html excluded
#   - Generator/dev files excluded

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BUILD_DIR="$SCRIPT_DIR/live"
ZIP_NAME="expzeno-live-$(date +%Y%m%d-%H%M).tar.gz"

echo "=== Building expzeno.com production package ==="

# Clean previous build
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

# Copy all site files (exclude dev-only stuff)
rsync -a --exclude='live/' \
  --exclude='.git/' \
  --exclude='.gitignore' \
  --exclude='node_modules/' \
  --exclude='package.json' \
  --exclude='package-lock.json' \
  --exclude='build-live.sh' \
  --exclude='generate-news.*' \
  --exclude='news-sitemap-entries.txt' \
  --exclude='seoplan.html' \
  --exclude='PRD.md' \
  --exclude='CLAUDE.md' \
  --exclude='CONVERSATIONS.json' \
  --exclude='.workstream-cwd' \
  --exclude='.handoff.md' \
  --exclude='.model' \
  --exclude='feedback-screenshots/' \
  --exclude='docs/' \
  --exclude='*.zip' \
  "$SCRIPT_DIR/" "$BUILD_DIR/"

# Transform: noindex → index on all HTML files
find "$BUILD_DIR" -name '*.html' -exec sed -i 's/content="noindex, nofollow"/content="index, follow"/g' {} +
echo "  ✓ Stripped noindex from all pages"

# Transform: robots.txt — allow crawlers
cat > "$BUILD_DIR/robots.txt" << 'ROBOTS'
User-agent: *
Allow: /
Disallow: /seoplan

Sitemap: https://expzeno.com/sitemap.xml
ROBOTS
echo "  ✓ robots.txt opened for crawlers"

# Count files
HTML_COUNT=$(find "$BUILD_DIR" -name '*.html' | wc -l)
echo "  ✓ $HTML_COUNT HTML pages included"

# Create zip
cd "$SCRIPT_DIR"
rm -f "$ZIP_NAME"
cd "$BUILD_DIR"
tar czf "$SCRIPT_DIR/$ZIP_NAME" .
cd "$SCRIPT_DIR"

# Clean build dir
rm -rf "$BUILD_DIR"

ZIP_SIZE=$(du -h "$ZIP_NAME" | cut -f1)
echo ""
echo "=== Done ==="
echo "  Package: $ZIP_NAME ($ZIP_SIZE)"
echo "  Upload this to your production server's web root."
echo "  Nginx needs: try_files \$uri \$uri.html \$uri/ =404"
