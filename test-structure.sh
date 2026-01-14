#!/bin/bash

# Test Script untuk KARTEJI Struktur Baru
# Script ini akan mengecek apakah semua file ada dan valid

echo "🧪 Testing KARTEJI New Structure..."
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASS=0
FAIL=0

# Function to check file
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} $1 - NOT FOUND"
        ((FAIL++))
    fi
}

# Function to check directory
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} $1/ - NOT FOUND"
        ((FAIL++))
    fi
}

echo "📁 Checking Directories..."
echo "-------------------------"
check_dir "config"
check_dir "utils"
check_dir "components"
check_dir "assets"
echo ""

echo "⚙️  Checking Config Files..."
echo "---------------------------"
check_file "config/firebase.js"
check_file "config/cloudinary.js"
check_file "config/roles.js"
echo ""

echo "🛠️  Checking Utils Files..."
echo "-------------------------"
check_file "utils/firebase-utils.js"
check_file "utils/cloudinary-utils.js"
check_file "utils/helpers.js"
check_file "utils/theme.js"
check_file "utils/validation.js"
echo ""

echo "🎨 Checking Component Files..."
echo "-----------------------------"
check_file "components/loader.js"
check_file "components/header.js"
check_file "components/modal.js"
check_file "components/toast.js"
echo ""

echo "📄 Checking Documentation..."
echo "---------------------------"
check_file "README.md"
check_file "SETUP.md"
check_file "MIGRATION.md"
check_file "CHANGELOG.md"
check_file "SUMMARY.md"
check_file "package.json"
check_file ".gitignore"
echo ""

echo "🎯 Checking Template & Assets..."
echo "-------------------------------"
check_file "template.html"
check_file "assets/styles.css"
echo ""

echo "📊 Checking Existing HTML Files..."
echo "---------------------------------"
check_file "dashboard.html"
check_file "karteji-unified.html"
check_file "super-admin.html"
check_file "ketua.html"
check_file "wakil-ketua.html"
check_file "sekretaris.html"
check_file "bendahara.html"
check_file "koordinator.html"
check_file "anggota.html"
echo ""

# Summary
echo "=================================="
echo "📊 Test Summary"
echo "=================================="
echo -e "${GREEN}Passed:${NC} $PASS"
echo -e "${RED}Failed:${NC} $FAIL"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed!${NC}"
    echo ""
    echo "🚀 Next Steps:"
    echo "1. Setup Cloudinary credentials in config/cloudinary.js"
    echo "2. Start server: python3 -m http.server 8000"
    echo "3. Open browser: http://localhost:8000/template.html"
    echo "4. Read documentation: README.md"
    exit 0
else
    echo -e "${RED}❌ Some tests failed!${NC}"
    echo "Please check the missing files above."
    exit 1
fi
