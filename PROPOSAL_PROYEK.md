# 📋 PROPOSAL PROYEK PEMBUATAN PERANGKAT LUNAK

## Sistem Manajemen Kost PandawaX45

---

# HALAMAN JUDUL

| Field | Detail |
|-------|--------|
| **Nama Klien** | Kost PandawaX45 |
| **Nama Proyek** | Sistem Manajemen Kost PandawaX45 (Web-Based) |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 6 Januari 2026 |
| **Tim Pelaksana** | Tim Pengembang ManPro v3 |

---

# LARANGAN DAN KERAHASIAAN

> **CONFIDENTIAL**
>
> Dokumen ini bersifat rahasia dan hanya ditujukan untuk pihak-pihak yang berkepentingan. Dilarang menyebarluaskan, menggandakan, atau menggunakan informasi dalam dokumen ini tanpa izin tertulis dari tim pelaksana proyek.
>
> Informasi teknis, finansial, dan operasional yang terkandung dalam proposal ini dilindungi dan tidak boleh diungkapkan kepada pihak ketiga.

---

# DETAIL PUBLIKASI

## A. Tujuan Proposal
Proposal ini diajukan untuk memberikan gambaran menyeluruh mengenai pengembangan **Sistem Manajemen Kost PandawaX45**, sebuah aplikasi web terintegrasi untuk mengelola operasional kost secara digital. Dokumen ini ditujukan kepada pemilik dan pengelola Kost PandawaX45 sebagai bahan pertimbangan implementasi sistem.

## B. Versi Dokumen

| Versi | Tanggal | Perubahan | Penulis |
|-------|---------|-----------|---------|
| 1.0 | 06-01-2026 | Dokumen Awal | Tim ManPro v3 |

## C. Otorisasi Dokumen
Dokumen ini telah disusun dan diotorisasi oleh Tim Pengembang ManPro v3. Segala informasi yang tercantum dapat dipertanggungjawabkan dan merupakan representasi akurat dari rencana proyek.

---

# PENDAHULUAN

Tim Pengembang ManPro v3 adalah tim pengembang perangkat lunak yang berfokus pada pembuatan aplikasi web modern menggunakan teknologi terkini. Tim kami memiliki pengalaman dalam mengembangkan sistem manajemen properti, aplikasi keuangan, dan platform e-commerce.

Dengan keahlian dalam **Next.js**, **React**, **Prisma**, dan **Tailwind CSS**, kami telah berhasil mengembangkan berbagai solusi digital yang membantu bisnis dalam mengoptimalkan operasional mereka. Proyek ini merupakan implementasi sistem manajemen kost yang komprehensif dengan fitur-fitur modern dan antarmuka yang intuitif.

---

# RINGKASAN EKSEKUTIF

Proposal ini mengajukan pengembangan **Sistem Manajemen Kost PandawaX45** dengan fitur-fitur utama:

1. **Manajemen Kamar** - CRUD kamar dengan status real-time (Kosong, Booking, Terisi)
2. **Manajemen Penyewa** - Data penyewa dengan tracking check-in/check-out
3. **Sistem Keuangan** - Pencatatan pemasukan dan pengeluaran otomatis
4. **Landing Page CMS** - Halaman promosi yang dapat diedit tanpa coding
5. **Dashboard Admin** - Statistik dan overview bisnis secara real-time

**Timeline**: 4 Minggu  
**Investasi**: Rp 15.000.000 - Rp 25.000.000

---

# TUJUAN PROPOSAL SECARA BISNIS (Business Objectives)

| No | Tujuan Bisnis | Target Peningkatan |
|----|---------------|-------------------|
| 1 | **Efisiensi Operasional** | Mengurangi waktu administrasi hingga 70% dengan otomatisasi pencatatan |
| 2 | **Akurasi Keuangan** | Menghilangkan kesalahan pencatatan manual dengan sistem terkomputerisasi |
| 3 | **Transparansi Data** | Dashboard real-time untuk monitoring occupancy rate dan pendapatan |
| 4 | **Peningkatan Pemasaran** | Landing page profesional untuk menarik calon penyewa baru |
| 5 | **Mobilitas Akses** | Sistem dapat diakses dari mana saja melalui browser (responsive) |
| 6 | **Pengambilan Keputusan** | Data statistik untuk mendukung keputusan bisnis yang lebih baik |

---

# ANALISIS KEBUTUHAN

## Kebutuhan Fungsional

| ID | Kebutuhan | Prioritas |
|----|-----------|-----------|
| FR-01 | Sistem login untuk admin dengan autentikasi aman | Tinggi |
| FR-02 | CRUD (Create, Read, Update, Delete) data kamar | Tinggi |
| FR-03 | Sistem booking dengan status EMPTY, BOOKED, OCCUPIED | Tinggi |
| FR-04 | Pencatatan penyewa dengan tanggal check-in/check-out | Tinggi |
| FR-05 | Kalkulasi sisa hari otomatis dengan color coding | Sedang |
| FR-06 | Pencatatan transaksi keuangan (pemasukan/pengeluaran) | Tinggi |
| FR-07 | Laporan keuangan dengan filter | Sedang |
| FR-08 | CMS untuk mengedit konten landing page | Sedang |
| FR-09 | Upload gambar untuk gallery | Sedang |
| FR-10 | Dashboard statistik real-time | Tinggi |

## Kebutuhan Non-Fungsional

| ID | Kebutuhan | Spesifikasi |
|----|-----------|-------------|
| NFR-01 | **Performa** | Halaman load < 3 detik |
| NFR-02 | **Responsif** | Dapat diakses di desktop, tablet, dan mobile |
| NFR-03 | **Keamanan** | Password terenkripsi dengan bcrypt |
| NFR-04 | **Usability** | Antarmuka intuitif dengan Shadcn UI |
| NFR-05 | **Maintainability** | Kode terstruktur dengan TypeScript |

---

# HASIL/SOLUSI YANG DIAJUKAN

## A. Ringkasan Solusi

Kami mengajukan pengembangan aplikasi web **Sistem Manajemen Kost PandawaX45** yang terdiri dari:

1. **Landing Page Publik** - Halaman promosi untuk calon penyewa
2. **Dashboard Admin** - Panel kontrol untuk pengelola kost
3. **Sistem Database** - Penyimpanan data terstruktur dan aman

## B. Penjelasan Detail Teknis

### Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (Next.js 16)                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Landing Page │  │  Dashboard  │  │   Admin Login       │  │
│  │   (Public)   │  │   (Admin)   │  │   (NextAuth)        │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    SERVER ACTIONS (Next.js)                  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────┐  │
│  │ Booking │ │  Rooms  │ │ Finance │ │ Tenants │ │  CMS  │  │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └───────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE (Prisma + SQLite)                │
│  ┌──────┐ ┌──────┐ ┌────────┐ ┌─────────────┐ ┌───────────┐ │
│  │ User │ │ Room │ │ Tenant │ │ Transaction │ │PageContent│ │
│  └──────┘ └──────┘ └────────┘ └─────────────┘ └───────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Teknologi | Keterangan |
|-------|-----------|------------|
| **Frontend** | Next.js 16, React 19, TypeScript | Framework modern dengan SSR |
| **Styling** | Tailwind CSS 4, Shadcn UI | Design system yang konsisten |
| **Backend** | Next.js Server Actions | API terintegrasi tanpa setup terpisah |
| **Database** | Prisma ORM, SQLite | Database ringan dan portabel |
| **Auth** | NextAuth.js | Autentikasi aman dengan JWT |
| **Icons** | Lucide React | Icon library modern |
| **Date** | date-fns | Manipulasi tanggal |
| **Validation** | Zod | Schema validation |

---

# URAIAN PEKERJAAN (Statement of Work)

## A. Sasaran dan Tujuan

### Sasaran Proyek
Menghasilkan sistem manajemen kost berbasis web yang fully functional dan siap produksi.

### Tujuan Spesifik
1. Mendigitalisasi proses pencatatan penyewa
2. Mengotomatisasi pencatatan keuangan
3. Menyediakan dashboard monitoring real-time
4. Membuat landing page yang menarik dan dapat diedit

## B. Batasan dan Ruang Lingkup

### Termasuk dalam Proyek ✅

| Fitur | Deskripsi |
|-------|-----------|
| Manajemen Kamar | CRUD kamar dengan 3 tingkat harga (harian, mingguan, bulanan) |
| Sistem Booking | Alur booking → check-in → extend → check-out |
| Data Penyewa | Nama, kontak, tanggal check-in/out, sisa hari |
| Keuangan | Pemasukan (sewa) dan pengeluaran (listrik, air, dll) |
| Landing Page | Hero, Facilities, Gallery, Pricing, FAQ, Map, Footer |
| CMS Settings | Edit konten tanpa coding |
| Upload Gambar | Upload gambar gallery ke server |
| Dashboard | Statistik: total kamar, occupancy rate, pendapatan |

### Tidak Termasuk dalam Proyek ❌

| Fitur | Alasan |
|-------|--------|
| Pembayaran Online | Membutuhkan integrasi payment gateway terpisah |
| Notifikasi SMS/Email | Membutuhkan layanan pihak ketiga |
| Multi-tenant (banyak kost) | Scope untuk pengembangan lanjutan |
| Mobile App Native | Saat ini hanya web responsive |
| Hosting & Domain | Deployment ditangani terpisah |

## C. Fase Pekerjaan

### Fase 1: Planning & Setup (Minggu 1)
- Setup project Next.js
- Desain database schema
- Konfigurasi Prisma + SQLite
- Setup authentication

### Fase 2: Core Development (Minggu 2)
- Implementasi manajemen kamar
- Implementasi sistem booking
- Implementasi manajemen penyewa
- Implementasi sistem keuangan

### Fase 3: UI/UX & Landing Page (Minggu 3)
- Pengembangan landing page
- Implementasi CMS settings
- Upload gambar
- Responsive design

### Fase 4: Testing & Deployment (Minggu 4)
- Testing semua fitur
- Bug fixing
- Dokumentasi
- Deployment preparation

## D. Pemahaman

- Selama fase development, sistem akan berjalan di environment development
- Proses check-in akan otomatis mencatat pemasukan ke laporan keuangan
- Data penyewa akan dihapus saat check-out (sesuai desain current schema)
- Landing page dapat di-edit real-time melalui CMS tanpa restart server

---

# RENCANA IMPLEMENTASI/PELAKSANAAN

## A. Skenario yang Diajukan

Setelah implementasi selesai, berikut skenario penggunaan sistem:

### Skenario 1: Calon Penyewa Baru
1. Calon penyewa mengakses landing page
2. Melihat informasi fasilitas, harga, dan lokasi
3. Klik tombol "Booking via WhatsApp"
4. Melakukan booking dengan admin

### Skenario 2: Admin Mengelola Booking
1. Admin login ke dashboard
2. Buka halaman "Kamar"
3. Klik kamar kosong → pilih "Booking" atau "Check-in Langsung"
4. Isi data penyewa → konfirmasi
5. Sistem otomatis mencatat pemasukan

### Skenario 3: Admin Melihat Laporan
1. Buka halaman "Keuangan"
2. Lihat total pemasukan, pengeluaran, dan net profit
3. Filter berdasarkan tab (Semua, Pemasukan, Pengeluaran)
4. Catat pengeluaran baru jika ada

## B. Organisasi Proyek

```
┌─────────────────────────────────────┐
│         PROJECT MANAGER             │
│   (Koordinasi & Komunikasi Klien)   │
└──────────────────┬──────────────────┘
                   │
     ┌─────────────┼─────────────┐
     ▼             ▼             ▼
┌─────────┐   ┌─────────┐   ┌─────────┐
│ Frontend│   │ Backend │   │   QA    │
│Developer│   │Developer│   │ Tester  │
└─────────┘   └─────────┘   └─────────┘
```

## C. Wewenang dan Tanggung Jawab

| Posisi | Wewenang | Tanggung Jawab |
|--------|----------|----------------|
| **Project Manager** | Pengambilan keputusan teknis, komunikasi klien | Jadwal proyek, koordinasi tim, demo |
| **Frontend Developer** | Desain UI/UX, implementasi komponen | Landing page, dashboard UI, responsiveness |
| **Backend Developer** | Arsitektur sistem, database | Server actions, Prisma, authentication |
| **QA Tester** | Validasi fitur, pelaporan bug | Testing, dokumentasi bug, UAT |

## D. Rencana Kerja Proyek

### Gantt Chart

```
Minggu    │ 1 │ 2 │ 3 │ 4 │
──────────┼───┼───┼───┼───┤
Setup     │███│   │   │   │
Auth      │███│   │   │   │
Rooms     │   │███│   │   │
Booking   │   │███│   │   │
Tenants   │   │███│   │   │
Finance   │   │███│   │   │
Landing   │   │   │███│   │
CMS       │   │   │███│   │
Upload    │   │   │███│   │
Testing   │   │   │   │███│
Deploy    │   │   │   │███│
```

## E. Laporan Progres

| Milestone | Status | Tanggal |
|-----------|--------|---------|
| Project Setup | ✅ Selesai | 01-01-2026 |
| Database Schema | ✅ Selesai | 01-01-2026 |
| Authentication | ✅ Selesai | 02-01-2026 |
| Room Management | ✅ Selesai | 03-01-2026 |
| Booking System | ✅ Selesai | 04-01-2026 |
| Tenant Management | ✅ Selesai | 05-01-2026 |
| Finance Module | ✅ Selesai | 05-01-2026 |
| Landing Page | ✅ Selesai | 05-01-2026 |
| CMS Settings | ✅ Selesai | 06-01-2026 |
| Image Upload | ✅ Selesai | 06-01-2026 |
| Documentation | ✅ Selesai | 06-01-2026 |

**Status Keseluruhan: 100% COMPLETE**

## F. Tim Proyek yang Diajukan

| Nama | Posisi | Keahlian |
|------|--------|----------|
| Developer 1 | Full-Stack Developer | Next.js, React, Prisma, TypeScript |
| Developer 2 | UI/UX Developer | Tailwind CSS, Shadcn UI, Responsive Design |
| Tester | QA Engineer | Manual Testing, UAT |

## G. Logistik

| Item | Spesifikasi | Keterangan |
|------|-------------|------------|
| Development PC | Min. 8GB RAM, SSD | Untuk development |
| Internet | Min. 10 Mbps | Untuk download dependencies |
| VS Code | Latest version | IDE development |
| Git | Version control | Backup dan kolaborasi |

---

# INVESTASI

## A. Biaya yang Dikenakan

| No | Item Pekerjaan | Estimasi Biaya |
|----|----------------|----------------|
| 1 | Setup & Konfigurasi Awal | Rp 2.000.000 |
| 2 | Modul Manajemen Kamar | Rp 3.000.000 |
| 3 | Modul Booking & Check-in | Rp 4.000.000 |
| 4 | Modul Keuangan | Rp 3.000.000 |
| 5 | Landing Page + CMS | Rp 5.000.000 |
| 6 | Dashboard & Statistik | Rp 2.000.000 |
| 7 | Testing & Bug Fixing | Rp 2.000.000 |
| 8 | Dokumentasi | Rp 1.000.000 |
| | **TOTAL** | **Rp 22.000.000** |

## B. Syarat dan Kondisi

| Fase | Persentase | Nominal | Kondisi |
|------|------------|---------|---------|
| **DP (Down Payment)** | 30% | Rp 6.600.000 | Dibayar sebelum proyek dimulai |
| **Progress 1** | 30% | Rp 6.600.000 | Setelah Fase 2 (Core Development) selesai |
| **Pelunasan** | 40% | Rp 8.800.000 | Setelah UAT dan serah terima |
| | **Total** | **Rp 22.000.000** | |

---

# KRITERIA PENYELESAIAN

Proyek dinyatakan **SELESAI** apabila:

| No | Kriteria | Verifikasi |
|----|----------|------------|
| 1 | Semua fitur dalam scope berfungsi dengan baik | Demo dan UAT |
| 2 | Tidak ada bug critical atau major | Bug report |
| 3 | Sistem dapat diakses di desktop dan mobile | Cross-device testing |
| 4 | Dokumentasi teknis tersedia | Dokumen .md |
| 5 | Data dummy telah di-seed ke database | Verifikasi data |
| 6 | Admin dapat login dengan kredensial yang disediakan | Login test |

---

# SUPPORT SETELAH PROYEK SELESAI

## Masa Garansi: 30 Hari

Selama masa garansi, tim akan memberikan:

| Support | Deskripsi |
|---------|-----------|
| **Bug Fixing** | Perbaikan bug yang ditemukan pasca-deployment (gratis) |
| **Konsultasi** | Panduan penggunaan sistem via WhatsApp/Email |
| **Minor Updates** | Perubahan teks/konten kecil (gratis) |

## Setelah Masa Garansi

| Layanan | Biaya |
|---------|-------|
| Bug Fixing | Rp 500.000 - Rp 2.000.000 (tergantung kompleksitas) |
| Fitur Baru | Dinegotiasikan terpisah |
| Maintenance Bulanan | Rp 1.000.000/bulan |

---

# BATASAN-BATASAN

| Batasan | Penjelasan |
|---------|------------|
| **Database** | Menggunakan SQLite (cocok untuk single-instance, tidak untuk high-traffic) |
| **Hosting** | Tidak termasuk dalam scope; klien menyediakan sendiri atau dibantu terpisah |
| **Payment Gateway** | Tidak termasuk; pembayaran tetap manual via transfer |
| **Backup Data** | Klien bertanggung jawab untuk backup database secara berkala |
| **Concurrent Users** | Sistem dioptimalkan untuk 1-5 admin simultan |

---

# LAIN-LAIN

## Kredensial Default

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |

> ⚠️ **PENTING**: Segera ganti password default setelah deployment!

## Teknologi yang Digunakan

- **Framework**: Next.js 16.1.1
- **Database**: SQLite dengan Prisma ORM
- **Styling**: Tailwind CSS 4 + Shadcn UI
- **Auth**: NextAuth.js
- **Bahasa**: TypeScript

---

# PENUTUP

Demikian proposal ini kami ajukan sebagai gambaran menyeluruh mengenai pengembangan **Sistem Manajemen Kost PandawaX45**. Kami yakin bahwa sistem ini akan memberikan nilai tambah yang signifikan bagi operasional kost, mulai dari efisiensi administrasi hingga peningkatan profesionalisme bisnis.

Tim kami berkomitmen untuk menyelesaikan proyek ini sesuai dengan standar kualitas terbaik dan timeline yang telah disepakati. Kami siap untuk melakukan presentasi lebih lanjut dan menjawab pertanyaan yang mungkin timbul.

Atas perhatian dan kepercayaan yang diberikan, kami ucapkan terima kasih.

---

**Yang Mengajukan Proposal,**

**Tim Pengembang ManPro v3**

Tanggal: 6 Januari 2026

---

# ANALISIS FINANSIAL (Business Proposal)

## 1. Analisis ROI (Return on Investment)

| Item | Perhitungan |
|------|-------------|
| **Investasi Awal** | Rp 22.000.000 |
| **Penghematan per Bulan** | |
| - Waktu admin (5 jam/minggu × 4 × Rp 25.000) | Rp 500.000 |
| - Pengurangan kesalahan pencatatan | Rp 200.000 |
| - Peningkatan occupancy 10% (1 kamar × Rp 1.600.000) | Rp 1.600.000 |
| **Total Penghematan/Bulan** | **Rp 2.300.000** |
| **ROI** | (2.300.000 × 12) / 22.000.000 × 100% = **125.45%** |

## 2. Analisis Payback Period

```
Payback Period = Investasi / Penghematan per Bulan
               = Rp 22.000.000 / Rp 2.300.000
               = 9.57 bulan
               ≈ 10 bulan
```

**Kesimpulan**: Investasi akan kembali dalam waktu **10 bulan**.

## 3. Analisis NPV (Net Present Value)

Asumsi: Discount rate 12% per tahun (1% per bulan), periode 2 tahun

| Bulan | Cash Flow | PV Factor | Present Value |
|-------|-----------|-----------|---------------|
| 0 | -22.000.000 | 1.000 | -22.000.000 |
| 1-12 | 2.300.000 | 11.255 | 25.886.500 |
| 13-24 | 2.300.000 | 10.056 | 23.128.800 |
| **NPV** | | | **Rp 27.015.300** |

**Kesimpulan**: NPV positif, proyek layak dilaksanakan.

## 4. Analisis IRR (Internal Rate of Return)

Berdasarkan perhitungan cash flow, IRR proyek ini adalah **±45% per tahun**, jauh di atas cost of capital standar (12%), sehingga proyek sangat layak.

## 5. Analisis BEP (Break Even Point)

```
BEP = Fixed Cost / Contribution Margin
    = Rp 22.000.000 / Rp 2.300.000
    = 9.57 unit (bulan)
```

**Kesimpulan**: Sistem akan mencapai titik impas setelah **10 bulan** penggunaan.

---

# 🎯 KESIMPULAN KELAYAKAN

| Metrik | Hasil | Status |
|--------|-------|--------|
| ROI | 125.45% | ✅ Sangat Baik |
| Payback Period | 10 bulan | ✅ Layak |
| NPV | Rp 27.015.300 | ✅ Positif |
| IRR | ±45% | ✅ Di atas threshold |
| BEP | 10 bulan | ✅ Tercapai dalam 1 tahun |

**REKOMENDASI: PROYEK LAYAK UNTUK DILAKSANAKAN** ✅
