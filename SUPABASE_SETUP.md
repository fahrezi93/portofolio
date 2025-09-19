# Supabase Setup untuk Comments System

## 🚀 Setup Instructions

### 1. Create Supabase Project
1. Pergi ke [supabase.com](https://supabase.com)
2. Sign up/Login dengan GitHub
3. Klik "New Project"
4. Pilih organization dan beri nama project (misal: "portfolio-comments")
5. Set password yang kuat
6. Pilih region terdekat (Singapore untuk Indonesia)
7. Tunggu project selesai dibuat (~2 menit)

### 2. Get Project Credentials
1. Di dashboard Supabase, pergi ke **Settings** > **API**
2. Copy **Project URL** dan **anon public key**
3. Buat file `.env.local` di root project:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Setup Database Schema
1. Di dashboard Supabase, pergi ke **SQL Editor**
2. Copy paste semua code dari file `supabase-schema.sql`
3. Klik **Run** untuk execute SQL

### 4. Test Connection
1. Restart development server: `npm run dev`
2. Buka portfolio dan coba submit comment
3. Check di **Table Editor** > **comments** untuk melihat data

## 📊 Database Structure

### Comments Table
```sql
- id: UUID (Primary Key)
- name: VARCHAR(100) 
- message: TEXT
- profile_photo_url: TEXT (optional)
- likes: INTEGER (default: 0)
- created_at: TIMESTAMP (auto)
```

### Storage Bucket
- **profile-photos**: Untuk menyimpan foto profil users
- Public access enabled
- Max file size: 5MB

## 🔒 Security Features

- **Row Level Security (RLS)** enabled
- Public read access untuk comments
- Public insert access untuk new comments  
- Public update access untuk likes
- File upload policies untuk profile photos

## 🛠️ Features

✅ **Real-time Comments**: Langsung tersimpan di database
✅ **Profile Photo Upload**: Upload ke Supabase Storage
✅ **Like System**: Increment likes dengan click
✅ **Error Handling**: Graceful fallback ke sample data
✅ **Loading States**: Professional UX
✅ **Responsive Design**: Perfect di mobile & desktop

## 🔧 Troubleshooting

### Comments tidak muncul?
1. Check `.env.local` file sudah benar
2. Verify Supabase project credentials
3. Pastikan SQL schema sudah dijalankan
4. Check browser console untuk error messages

### Upload foto gagal?
1. Pastikan storage bucket `profile-photos` sudah dibuat
2. Check file size < 5MB
3. Verify storage policies sudah di-setup

### Database connection error?
1. Check internet connection
2. Verify Supabase project masih aktif
3. Check API keys belum expired

## 💡 Tips

- Supabase free tier: 500MB database, 1GB storage
- Comments akan fallback ke sample data jika Supabase tidak tersedia
- Profile photos disimpan dengan timestamp untuk avoid conflicts
- Likes system menggunakan optimistic updates

## 🚀 Production Ready

Setelah setup selesai, comments system akan:
- Persist data permanently
- Handle concurrent users
- Scale automatically
- Backup otomatis oleh Supabase
