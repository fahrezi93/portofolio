# Panduan Pengaturan Email untuk Form Kontak

Dokumen ini menjelaskan cara mengatur EmailJS untuk mengirim email dari formulir kontak di website portofolio.

## Langkah-langkah Pengaturan EmailJS

### 1. Buat Akun EmailJS

1. Kunjungi [EmailJS](https://www.emailjs.com/) dan daftar untuk akun gratis
2. Login ke dashboard EmailJS

### 2. Tambahkan Email Service

1. Di dashboard EmailJS, klik "Email Services" di menu navigasi
2. Klik "Add New Service"
3. Pilih penyedia email yang ingin Anda gunakan (Gmail, Outlook, dll.)
4. Ikuti petunjuk untuk menghubungkan akun email Anda
5. Beri nama service Anda dan catat **Service ID** yang diberikan

### 3. Buat Template Email

1. Di dashboard EmailJS, klik "Email Templates" di menu navigasi
2. Klik "Create New Template"
3. Buat template email dengan variabel berikut:
   - `{{from_name}}` - Nama pengirim
   - `{{from_email}}` - Email pengirim
   - `{{message}}` - Pesan dari formulir
   - `{{to_name}}` - Nama penerima (Anda)
4. Simpan template dan catat **Template ID** yang diberikan

### 4. Dapatkan Public Key

1. Di dashboard EmailJS, klik "Account" di menu navigasi
2. Catat **Public Key** yang ditampilkan

### 5. Update Kode di contact-section.tsx

Buka file `src/components/contact-section.tsx` dan update variabel berikut dengan nilai yang Anda catat:

```typescript
const serviceId = 'YOUR_SERVICE_ID'; // Ganti dengan Service ID dari EmailJS
const templateId = 'YOUR_TEMPLATE_ID'; // Ganti dengan Template ID dari EmailJS
const publicKey = 'YOUR_PUBLIC_KEY'; // Ganti dengan Public Key dari EmailJS
```

## Alur Pengiriman Email

1. Pengguna mengisi formulir kontak di website
2. Saat formulir dikirim, data formulir dikirim ke EmailJS menggunakan API mereka
3. EmailJS memproses data dan mengirim email ke alamat yang dikonfigurasi dalam template
4. Email dikirim dari penyedia layanan email yang Anda konfigurasikan (Gmail, dll.)
5. Pengguna menerima notifikasi sukses/gagal di website

## Batasan Akun Gratis EmailJS

- 200 email per bulan
- Tidak ada dukungan SMTP kustom
- Branding EmailJS di email

Untuk volume email yang lebih tinggi atau fitur tambahan, pertimbangkan untuk meningkatkan ke paket berbayar.

## Keamanan

Perhatikan bahwa Public Key EmailJS disertakan di kode frontend. Ini adalah praktik standar untuk EmailJS, tetapi sebaiknya Anda mengatur domain restriction di dashboard EmailJS untuk mencegah penggunaan yang tidak sah.