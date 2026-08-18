# MASTER CONTEXT: mindfulnessintervention.id

## 1. Project Overview
Aplikasi web untuk intervensi kesehatan mental siswa SMA berbasis MBCT (Mindfulness-Based Cognitive Therapy). Memiliki 3 entitas pengguna: `siswa`, `guru_bk`, dan `superadmin`.

## 2. Tech Stack
- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS
- Database & Auth: Supabase (PostgreSQL)
- Icons: Lucide React

## 3. Brand Colors & UI Guidelines
DILARANG menggunakan warna default Tailwind selain spesifikasi ini:
- `brand-900` (#455E14) -> Primary text, primary buttons, active states, header tabel.
- `brand-700` (#7A9B57) -> Secondary text, borders, outline buttons.
- `brand-500` (#83951C) -> Accents, badges, success notifications.
- `brand-300` (#BDD299) -> Hover states, secondary backgrounds.
- `brand-50`  (#E5EEDA) -> Main canvas/page background.
- `surface`   (#FFFFFF) -> Card, form, dan table backgrounds.
*UI Style:* Clean, white-space heavy, rounded-2xl.

## 4. Clinical Constraints (ATURAN WAJIB)
1. **Video Lock:** Jika `video_url` pada sesi latihan bernilai `null`, maka seluruh form penugasan (worksheet) WAJIB di-`disabled`. Tombol submit berubah abu-abu dengan teks "Terkunci: Video Belum Ditonton".
2. **Counseling Lock:** Fitur chat dan booking Guru BK WAJIB dikunci (disabled, ikon gembok, tooltip peringatan) sampai siswa menyelesaikan penuh 4 sesi latihan mandiri.