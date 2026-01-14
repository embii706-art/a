# KARTEJI - Setup & Quick Start Guide

## 🚀 Quick Start

### 1. Setup Cloudinary Configuration

Edit file `config/cloudinary.js` dan ganti dengan kredensial Cloudinary Anda:

```javascript
export const cloudinaryConfig = {
  cloudName: "YOUR_CLOUD_NAME",      // Ganti dengan cloud name Anda
  uploadPreset: "YOUR_UPLOAD_PRESET" // Ganti dengan upload preset Anda
};
```

**Cara mendapatkan Cloudinary credentials:**
1. Login ke [Cloudinary Dashboard](https://cloudinary.com/console)
2. Cloud Name ada di dashboard utama
3. Buat Upload Preset di Settings → Upload → Upload presets

### 2. Start Development Server

```bash
# Menggunakan Python
python3 -m http.server 8000

# Atau menggunakan npm (jika sudah install)
npm run serve
```

Buka browser dan akses: `http://localhost:8000`

### 3. Login ke Aplikasi

1. Buka `http://localhost:8000/dashboard.html`
2. Login dengan kredensial Firebase Anda
3. Sistem akan redirect ke halaman sesuai role

## 📁 Struktur Baru (Summary)

```
/workspaces/a/
├── config/                    # ✅ Konfigurasi (Firebase & Cloudinary)
│   ├── firebase.js           # Konfigurasi Firebase (TIDAK DIUBAH)
│   ├── cloudinary.js         # Konfigurasi Cloudinary (TIDAK DIUBAH)
│   └── roles.js              # Konfigurasi roles
│
├── utils/                     # ✅ Utility Functions
│   ├── firebase-utils.js     # Helper Firebase
│   ├── cloudinary-utils.js   # Helper Cloudinary  
│   ├── helpers.js            # Helper umum
│   ├── theme.js              # Theme management
│   └── validation.js         # Validasi data
│
├── components/                # ✅ Komponen Reusable
│   ├── loader.js             # Loading component
│   ├── header.js             # Header component
│   ├── modal.js              # Modal component
│   └── toast.js              # Toast notification
│
├── assets/                    # ✅ Static Assets
│   └── styles.css            # Global styles
│
├── *.html                     # Halaman-halaman aplikasi
├── template.html              # ✅ Template contoh
├── README.md                  # ✅ Dokumentasi lengkap
├── MIGRATION.md               # ✅ Panduan migrasi
├── SETUP.md                   # ✅ Setup guide (file ini)
├── package.json               # ✅ Package configuration
└── .gitignore                 # ✅ Git ignore rules
```

## 🎯 Keuntungan Struktur Baru

### 1. **Modular & Reusable**
- Komponen dapat digunakan di berbagai halaman
- Tidak perlu copy-paste code
- Mudah di-maintain

### 2. **Organized**
- File terpisah berdasarkan fungsi
- Mudah mencari dan menemukan code
- Clear separation of concerns

### 3. **No Firebase/Cloudinary Changes**
- Konfigurasi tetap sama
- Hanya struktur yang berubah
- Backward compatible

### 4. **Better DX (Developer Experience)**
- Auto-complete dengan ES6 modules
- Clear import statements
- TypeScript-ready (jika diperlukan)

### 5. **Performance**
- ES6 modules di-load secara parallel
- Tree-shaking ready
- Smaller bundle size potential

## 📝 Contoh Penggunaan

### Import dan Gunakan Functions

```javascript
// Import dari utils
import { 
  auth, db, checkAuth, getUserRole 
} from './utils/firebase-utils.js';

import { 
  uploadImage, validateImageFile 
} from './utils/cloudinary-utils.js';

import { 
  formatCurrency, formatDate, showToast 
} from './utils/helpers.js';

// Import dari components
import { 
  createHeader, initHeaderEvents 
} from './components/header.js';

import { 
  showModal, hideModal, confirmDialog 
} from './components/modal.js';

import { 
  toastSuccess, toastError 
} from './components/toast.js';

// Gunakan functions
const user = await checkAuth();
const role = await getUserRole(user.uid);
const formatted = formatCurrency(150000);
toastSuccess('Berhasil!');
```

### Buat Halaman Baru

1. Copy `template.html` sebagai starting point
2. Import modules yang diperlukan
3. Sesuaikan konten
4. Test fungsionalitas

## 🔧 Troubleshooting

### CORS Error saat load modules
**Problem:** `CORS policy blocked`

**Solution:** 
```bash
# Pastikan menggunakan local server, bukan file://
python3 -m http.server 8000
```

### Module not found
**Problem:** `Failed to resolve module specifier`

**Solution:**
- Check path import (harus relative: `./utils/...`)
- Check file exists di lokasi yang benar

### Firebase already initialized
**Problem:** `Firebase app already exists`

**Solution:**
- Import dari `firebase-utils.js` (sudah initialized)
- Jangan initialize Firebase lagi

## 📚 Next Steps

### Untuk Development:

1. ✅ **Setup Complete** - Struktur sudah dibuat
2. ⏳ **Configure Cloudinary** - Edit `config/cloudinary.js`
3. ⏳ **Migrate Pages** - Ikuti [MIGRATION.md](./MIGRATION.md)
4. ⏳ **Testing** - Test semua fungsionalitas
5. ⏳ **Deploy** - Deploy ke production

### Untuk Migration:

Lihat panduan lengkap di [MIGRATION.md](./MIGRATION.md)

## 🎓 Learning Resources

- [README.md](./README.md) - Dokumentasi struktur lengkap
- [MIGRATION.md](./MIGRATION.md) - Panduan migrasi
- [template.html](./template.html) - Template contoh implementasi
- [Firebase Docs](https://firebase.google.com/docs)
- [Cloudinary Docs](https://cloudinary.com/documentation)

## ✅ Checklist Setup

- [x] Struktur folder dibuat
- [x] Config files dibuat
- [x] Utility files dibuat
- [x] Component files dibuat
- [x] Styles dibuat
- [x] Documentation dibuat
- [ ] Configure Cloudinary credentials
- [ ] Test template.html
- [ ] Migrate existing pages
- [ ] Testing & debugging

## 📞 Support

Jika ada pertanyaan atau issue:
1. Check documentation (README.md, MIGRATION.md)
2. Check console browser untuk errors
3. Review template.html sebagai referensi
4. Contact team developer

---

**Version:** 2.0.0  
**Date:** January 14, 2026  
**Status:** ✅ Ready for Implementation
