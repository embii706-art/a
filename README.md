# KARTEJI - Struktur Baru

## 📁 Struktur Folder

```
/workspaces/a/
├── config/                 # Konfigurasi aplikasi
│   ├── firebase.js        # Konfigurasi Firebase (TIDAK DIUBAH)
│   ├── cloudinary.js      # Konfigurasi Cloudinary (TIDAK DIUBAH)
│   └── roles.js           # Konfigurasi role dan halaman
│
├── utils/                  # Utility functions
│   ├── firebase-utils.js  # Helper functions Firebase
│   ├── cloudinary-utils.js # Helper functions Cloudinary
│   ├── helpers.js         # Helper functions umum
│   ├── theme.js           # Theme management
│   └── validation.js      # Validasi data
│
├── components/            # Komponen reusable
│   ├── loader.js         # Loading component
│   ├── header.js         # Header component
│   ├── modal.js          # Modal component
│   └── toast.js          # Toast notification component
│
├── assets/               # Asset statis
│   └── styles.css       # Global styles dan CSS variables
│
├── dashboard.html        # Halaman login/verifikasi akses
├── karteji-unified.html  # Halaman unified (semua role dalam satu file)
├── super-admin.html      # Halaman Super Admin
├── ketua.html           # Halaman Ketua
├── wakil-ketua.html     # Halaman Wakil Ketua
├── sekretaris.html      # Halaman Sekretaris
├── bendahara.html       # Halaman Bendahara
├── koordinator.html     # Halaman Koordinator
└── anggota.html         # Halaman Anggota
```

## 🎯 Tujuan Refactoring

1. **Modular Structure**: Memisahkan konfigurasi, utilities, dan komponen
2. **Reusability**: Komponen dapat digunakan kembali di berbagai halaman
3. **Maintainability**: Lebih mudah untuk maintain dan update
4. **No Firebase/Cloudinary Changes**: Konfigurasi tetap sama, hanya struktur yang berubah
5. **Better Organization**: Kode lebih terorganisir dan mudah ditemukan

## 📦 Modul-Modul Utama

### 1. Configuration (`config/`)

#### `firebase.js`
- Menyimpan konfigurasi Firebase
- **TIDAK DIUBAH** dari konfigurasi original
- Export: `firebaseConfig`

#### `cloudinary.js`
- Menyimpan konfigurasi Cloudinary
- **TIDAK DIUBAH** dari konfigurasi original
- Export: `cloudinaryConfig`

#### `roles.js`
- Definisi semua role
- Mapping role ke halaman
- Label untuk setiap role

### 2. Utilities (`utils/`)

#### `firebase-utils.js`
- Initialize Firebase app, auth, dan firestore
- Helper functions:
  - `getUserRole(userId)` - Mendapatkan role user
  - `checkAuth()` - Cek autentikasi user
  - `handleLogout()` - Logout user
- Re-export Firebase functions yang sering digunakan

#### `cloudinary-utils.js`
- Helper functions untuk upload image
- Functions:
  - `uploadImage(file, onProgress)` - Upload gambar dengan progress tracking
  - `validateImageFile(file, options)` - Validasi file gambar
  - `previewImage(file)` - Preview gambar sebelum upload

#### `helpers.js`
- Utility functions umum:
  - `formatCurrency(amount)` - Format mata uang
  - `formatDate(date)` - Format tanggal
  - `formatDateTime(date)` - Format tanggal dan waktu
  - `debounce(func, wait)` - Debounce function
  - `showToast(message, type)` - Notifikasi toast
  - `showLoader()` / `hideLoader()` - Loading state
  - `generateId()` - Generate unique ID
  - `isValidEmail(email)` - Validasi email
  - Dan lain-lain

#### `theme.js`
- Theme management (dark/light mode)
- Functions:
  - `getCurrentTheme()` - Get current theme
  - `setTheme(theme)` - Set theme
  - `toggleTheme()` - Toggle theme
  - `initTheme()` - Initialize theme

#### `validation.js`
- Helper functions untuk validasi:
  - `validateRequired(data, fields)` - Validasi required fields
  - `validateEmail(email)` - Validasi email
  - `validatePassword(password)` - Validasi password
  - `validatePhone(phone)` - Validasi nomor telepon
  - `validateAmount(amount)` - Validasi nominal/angka
  - `validateDate(date)` - Validasi tanggal

### 3. Components (`components/`)

#### `loader.js`
- Komponen loading screen
- Functions:
  - `createLoader()` - Create loader HTML
  - `showLoader()` - Show loader
  - `hideLoader()` - Hide loader

#### `header.js`
- Komponen header dengan logo dan navigasi
- Functions:
  - `createHeader(options)` - Create header HTML
  - `initHeaderEvents(onLogout)` - Initialize event listeners

#### `modal.js`
- Komponen modal dialog
- Functions:
  - `createModal(options)` - Create modal
  - `showModal(id)` - Show modal
  - `hideModal(id)` - Hide modal
  - `updateModalContent(id, content)` - Update modal content
  - `confirmDialog(options)` - Show confirm dialog
  - `alertDialog(options)` - Show alert dialog

#### `toast.js`
- Komponen notifikasi toast
- Functions:
  - `showToast(options)` - Show toast notification
  - `toastSuccess(message)` - Success toast
  - `toastError(message)` - Error toast
  - `toastInfo(message)` - Info toast
  - `toastWarning(message)` - Warning toast

### 4. Assets (`assets/`)

#### `styles.css`
- Global CSS variables
- Theme variables (light/dark)
- Glass effect styles
- Animation keyframes
- Utility classes

## 🚀 Cara Menggunakan

### Import Modules (ES6 Modules)

```html
<script type="module">
  // Import Firebase utilities
  import { auth, db, checkAuth, getUserRole, handleLogout } from './utils/firebase-utils.js';
  
  // Import Cloudinary utilities
  import { uploadImage, validateImageFile } from './utils/cloudinary-utils.js';
  
  // Import helpers
  import { formatCurrency, formatDate, showToast } from './utils/helpers.js';
  
  // Import components
  import { createHeader, initHeaderEvents } from './components/header.js';
  import { showModal, hideModal, confirmDialog } from './components/modal.js';
  import { toastSuccess, toastError } from './components/toast.js';
  
  // Your code here
</script>
```

### Contoh Penggunaan

#### 1. Check Authentication
```javascript
import { checkAuth, getUserRole } from './utils/firebase-utils.js';

const user = await checkAuth();
if (!user) {
  window.location.href = '/dashboard.html';
  return;
}

const role = await getUserRole(user.uid);
console.log('User role:', role);
```

#### 2. Upload Image
```javascript
import { uploadImage, validateImageFile } from './utils/cloudinary-utils.js';
import { toastSuccess, toastError } from './components/toast.js';

try {
  validateImageFile(file);
  const imageUrl = await uploadImage(file, (progress) => {
    console.log('Upload progress:', progress + '%');
  });
  toastSuccess('Gambar berhasil diupload!');
} catch (error) {
  toastError('Gagal upload gambar: ' + error.message);
}
```

#### 3. Show Confirmation Dialog
```javascript
import { confirmDialog } from './components/modal.js';

const confirmed = await confirmDialog({
  title: 'Hapus Data',
  message: 'Apakah Anda yakin ingin menghapus data ini?',
  confirmText: 'Ya, Hapus',
  cancelText: 'Batal'
});

if (confirmed) {
  // Delete data
}
```

#### 4. Format Currency
```javascript
import { formatCurrency } from './utils/helpers.js';

const price = 150000;
console.log(formatCurrency(price)); // Rp150.000
```

## ⚠️ Catatan Penting

1. **Firebase Config**: Konfigurasi Firebase di `config/firebase.js` **TIDAK DIUBAH**
2. **Cloudinary Config**: Konfigurasi Cloudinary di `config/cloudinary.js` **TIDAK DIUBAH**
3. **ES6 Modules**: Gunakan `type="module"` di script tag
4. **Import Path**: Gunakan relative path yang benar
5. **Browser Compatibility**: Pastikan browser support ES6 modules

## 🔧 Langkah Implementasi

1. ✅ Buat struktur folder baru
2. ✅ Extract konfigurasi ke folder `config/`
3. ✅ Buat utility functions di folder `utils/`
4. ✅ Buat reusable components di folder `components/`
5. ✅ Buat global styles di folder `assets/`
6. ⏳ Refactor halaman-halaman HTML untuk menggunakan modul baru
7. ⏳ Testing dan debugging

## 📝 Next Steps

Untuk mengimplementasikan struktur baru ini ke halaman-halaman yang ada:

1. Update setiap halaman HTML untuk import modules yang diperlukan
2. Replace inline code dengan function calls ke utilities
3. Gunakan komponen yang sudah dibuat
4. Test setiap halaman untuk memastikan berfungsi dengan baik

## 🤝 Kontribusi

Struktur ini dapat dikembangkan lebih lanjut dengan:
- Menambah utility functions baru
- Membuat komponen-komponen tambahan
- Meningkatkan error handling
- Menambah dokumentasi

## 📞 Support

Jika ada pertanyaan atau issue terkait struktur baru ini, silakan buat issue atau hubungi tim developer.

---

**Created**: January 14, 2026
**Version**: 1.0.0
**Status**: ✅ Structure Created - Ready for Implementation
