#!/usr/bin/env bash
# بناء الموقع ونشره على خادم هيتزنر.
#   ./deploy.sh
set -euo pipefail

SERVER=${1:-46.62.201.114}
REMOTE=/var/www/palift-website

echo "==> بناء الصفحات"
node build.js

echo "==> رفع إلى $SERVER:$REMOTE"
rsync -az --delete \
  --exclude '.git' \
  --exclude '.DS_Store' \
  --exclude 'Assets' \
  --exclude 'build.js' \
  --exclude 'deploy.sh' \
  --exclude '.well-known' \
  ./ "root@$SERVER:$REMOTE/"

echo "==> فحص سريع على الدومين"
for p in / /equipment/ /models/ /noblelift/ /terms/ /privacy/; do
  code=$(curl -s -m 20 -o /dev/null -w "%{http_code}" --resolve "palift.ps:443:$SERVER" "https://palift.ps$p")
  printf "   %-16s %s\n" "$p" "$code"
done
echo "==> تم"
