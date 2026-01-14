# Migration Guide: Old Structure → New Structure

## 🎯 Tujuan Migration

Mengubah halaman-halaman HTML yang ada untuk menggunakan struktur modular baru tanpa mengubah konfigurasi Firebase dan Cloudinary.

## 📋 Checklist Migration

### Untuk Setiap Halaman HTML

- [ ] Import modules yang diperlukan
- [ ] Replace Firebase initialization dengan import dari `firebase-utils.js`
- [ ] Replace Cloudinary code dengan import dari `cloudinary-utils.js`
- [ ] Gunakan helper functions dari `helpers.js`
- [ ] Gunakan komponen dari folder `components/`
- [ ] Update styling untuk menggunakan `styles.css`
- [ ] Testing fungsionalitas

## 🔄 Step-by-Step Migration

### Step 1: Update Script Tag

**Before:**
```html
<script>
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
  
  const firebaseConfig = { /* config */ };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
</script>
```

**After:**
```html
<script type="module">
  import { auth, db, checkAuth, getUserRole } from './utils/firebase-utils.js';
  
  // auth dan db sudah ter-initialize
</script>
```

### Step 2: Replace Authentication Check

**Before:**
```javascript
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = '/dashboard.html';
    return;
  }
  
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  const role = userDoc.data().role;
});
```

**After:**
```javascript
const user = await checkAuth();
if (!user) {
  window.location.href = '/dashboard.html';
  return;
}

const role = await getUserRole(user.uid);
```

### Step 3: Replace Cloudinary Upload

**Before:**
```javascript
const fd = new FormData();
fd.append('file', file);
fd.append('upload_preset', 'your_preset');

const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
  method: 'POST',
  body: fd
});
const data = await res.json();
const imageUrl = data.secure_url;
```

**After:**
```javascript
import { uploadImage, validateImageFile } from './utils/cloudinary-utils.js';

try {
  validateImageFile(file);
  const imageUrl = await uploadImage(file, (progress) => {
    console.log(`Upload: ${progress}%`);
  });
} catch (error) {
  console.error('Upload failed:', error);
}
```

### Step 4: Replace Inline Toast/Alert

**Before:**
```javascript
alert('Data berhasil disimpan!');
```

**After:**
```javascript
import { toastSuccess } from './components/toast.js';

toastSuccess('Data berhasil disimpan!');
```

### Step 5: Replace Confirm Dialog

**Before:**
```javascript
if (confirm('Apakah Anda yakin ingin menghapus?')) {
  // Delete action
}
```

**After:**
```javascript
import { confirmDialog } from './components/modal.js';

const confirmed = await confirmDialog({
  title: 'Konfirmasi Hapus',
  message: 'Apakah Anda yakin ingin menghapus?',
  confirmText: 'Ya, Hapus',
  cancelText: 'Batal'
});

if (confirmed) {
  // Delete action
}
```

### Step 6: Replace Format Functions

**Before:**
```javascript
const formatted = `Rp ${amount.toLocaleString('id-ID')}`;
```

**After:**
```javascript
import { formatCurrency } from './utils/helpers.js';

const formatted = formatCurrency(amount);
```

### Step 7: Add Global Styles

**Before:**
```html
<style>
  /* Inline styles */
  .glass-card { ... }
</style>
```

**After:**
```html
<link rel="stylesheet" href="./assets/styles.css">
```

## 📝 Migration Example: bendahara.html

### Before (Old Structure)
```html
<!DOCTYPE html>
<html>
<head>
  <title>Bendahara</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
    import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
    
    const firebaseConfig = { /* ... */ };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = '/dashboard.html';
        return;
      }
      
      // Load data...
    });
    
    // Logout
    document.getElementById('btnLogout').addEventListener('click', async () => {
      if (confirm('Yakin logout?')) {
        await signOut(auth);
        window.location.href = '/dashboard.html';
      }
    });
  </script>
</body>
</html>
```

### After (New Structure)
```html
<!DOCTYPE html>
<html>
<head>
  <title>Bendahara</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="./assets/styles.css">
</head>
<body>
  <div id="headerContainer"></div>
  
  <script type="module">
    import { checkAuth, getUserRole, handleLogout } from './utils/firebase-utils.js';
    import { createHeader, initHeaderEvents } from './components/header.js';
    import { showLoader, hideLoader } from './components/loader.js';
    import { confirmDialog } from './components/modal.js';
    
    async function init() {
      showLoader();
      
      const user = await checkAuth();
      if (!user) {
        window.location.href = '/dashboard.html';
        return;
      }
      
      const role = await getUserRole(user.uid);
      
      // Create header
      const headerHTML = createHeader({ role: 'Bendahara' });
      document.getElementById('headerContainer').innerHTML = headerHTML;
      
      initHeaderEvents(async () => {
        const confirmed = await confirmDialog({
          title: 'Logout',
          message: 'Yakin ingin keluar?'
        });
        if (confirmed) await handleLogout();
      });
      
      // Load data...
      
      hideLoader();
    }
    
    init();
  </script>
</body>
</html>
```

## ✅ Testing Checklist

Setelah migration, pastikan:

- [ ] Authentication berfungsi
- [ ] Data loading berfungsi
- [ ] Upload gambar berfungsi (jika ada)
- [ ] Theme toggle berfungsi
- [ ] Toast notifications muncul
- [ ] Modal dialogs berfungsi
- [ ] Logout berfungsi
- [ ] Format currency/date berfungsi
- [ ] Tidak ada error di console
- [ ] Semua fitur yang ada sebelumnya masih berfungsi

## 🐛 Common Issues & Solutions

### Issue 1: Module not found
**Error:** `Failed to resolve module specifier`

**Solution:** 
- Pastikan path import benar (gunakan `./` untuk relative path)
- Pastikan file ada di lokasi yang benar

### Issue 2: CORS Error
**Error:** `CORS policy blocked`

**Solution:**
- Jalankan dengan local server (bukan file://)
- Gunakan `python3 -m http.server 8000` atau similar

### Issue 3: Firebase already initialized
**Error:** `Firebase app already initialized`

**Solution:**
- Import dari `firebase-utils.js` yang sudah initialize
- Jangan initialize Firebase lagi

### Issue 4: Function not found
**Error:** `showToast is not defined`

**Solution:**
- Import function yang diperlukan
- Contoh: `import { showToast } from './components/toast.js';`

## 📚 Resources

- [README.md](./README.md) - Dokumentasi lengkap struktur baru
- [template.html](./template.html) - Template halaman dengan struktur baru
- [Firebase Docs](https://firebase.google.com/docs)
- [Cloudinary Docs](https://cloudinary.com/documentation)

## 🎓 Best Practices

1. **Always use imports** - Jangan copy-paste code, gunakan imports
2. **Keep it DRY** - Don't Repeat Yourself, gunakan functions yang sudah ada
3. **Error handling** - Selalu handle error dengan try-catch
4. **User feedback** - Gunakan toast untuk memberi feedback ke user
5. **Loading states** - Tampilkan loader saat loading data
6. **Validation** - Validasi input user sebelum submit
7. **Confirmation** - Minta konfirmasi untuk action destructive (delete, logout, etc)

## 📞 Help & Support

Jika mengalami kesulitan saat migration:
1. Cek console browser untuk error messages
2. Bandingkan dengan [template.html](./template.html)
3. Review documentation di [README.md](./README.md)
4. Contact team developer

---

**Last Updated:** January 14, 2026
