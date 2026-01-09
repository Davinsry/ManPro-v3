# Kost PandawaX45 - Project Documentation

## 📁 Project Structure

```
ManPro v3/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.js                # Database seeder
│   └── dev.db                 # SQLite database
├── public/
│   └── uploads/               # Uploaded images
├── src/
│   ├── app/
│   │   ├── actions/           # Server Actions
│   │   │   ├── booking.ts     # Booking logic
│   │   │   ├── cms.ts         # CMS content
│   │   │   ├── dashboard.ts   # Dashboard stats
│   │   │   ├── finance.ts     # Finance transactions
│   │   │   ├── rooms.ts       # Room CRUD
│   │   │   └── tenants.ts     # Tenant data
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts  # NextAuth
│   │   │   └── upload/route.ts              # Image upload
│   │   ├── dashboard/
│   │   │   ├── layout.tsx     # Dashboard layout + auth
│   │   │   ├── page.tsx       # Overview stats
│   │   │   ├── rooms/page.tsx # Room management
│   │   │   ├── tenants/page.tsx # Tenant list
│   │   │   ├── finance/page.tsx # Financial reports
│   │   │   └── settings/page.tsx # CMS settings
│   │   ├── login/page.tsx     # Admin login
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── admin/             # Dashboard components
│   │   │   ├── BookingDialog.tsx
│   │   │   ├── CMSSettings.tsx
│   │   │   ├── FinanceClient.tsx
│   │   │   ├── RoomCard.tsx
│   │   │   ├── RoomList.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── ui/                # Shadcn UI components
│   │   └── *.tsx              # Landing page sections
│   └── lib/
│       ├── auth.ts            # NextAuth config
│       ├── cms-helper.ts      # CMS data helper
│       ├── data.ts            # Static content
│       ├── format.ts          # Number formatting
│       ├── prisma.ts          # Prisma client
│       ├── schemas.ts         # Zod schemas
│       └── utils.ts           # Utilities
├── package.json
├── next.config.ts
└── tsconfig.json
```

---

## 🗄️ Database Schema (Prisma)

```prisma
// prisma/schema.prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id       String @id @default(cuid())
  username String @unique
  password String
  name     String?
}

model Room {
  id           String   @id @default(cuid())
  number       String   @unique
  priceMonthly Decimal
  priceWeekly  Decimal
  priceDaily   Decimal
  status       String   @default("EMPTY") // EMPTY, BOOKED, OCCUPIED
  
  tenant       Tenant?
}

model Tenant {
  id          String   @id @default(cuid())
  name        String
  contact     String
  checkInDate DateTime
  checkOutDate DateTime
  
  status      String   @default("ACTIVE") // ACTIVE, BOOKED
  
  roomId      String   @unique
  room        Room     @relation(fields: [roomId], references: [id])
}

model Transaction {
  id          String   @id @default(cuid())
  date        DateTime @default(now())
  amount      Decimal
  type        String   // INCOME, EXPENSE
  category    String   // RENT, ELECTRICITY, ETC
  description String?
}

model PageContent {
  key   String @id
  value String // JSON string
}
```

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "@prisma/client": "5.22.0",
    "bcryptjs": "^3.0.3",
    "date-fns": "^4.1.0",
    "lucide-react": "^0.562.0",
    "next": "16.1.1",
    "next-auth": "^4.24.13",
    "prisma": "5.22.0",
    "react": "19.2.3",
    "react-day-picker": "^9.13.0",
    "tailwindcss": "^4",
    "zod": "^4.3.5"
  }
}
```

---

## 🔐 Authentication (NextAuth)

```typescript
// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });
        
        if (!user) return null;
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;
        
        return { id: user.id, name: user.name, username: user.username };
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
};
```

---

## 🏠 Server Actions

### Booking Actions
```typescript
// src/app/actions/booking.ts
export async function bookRoom(roomId: string, data) { ... }
export async function checkInRoom(roomId: string, data) { ... }
export async function confirmBooking(roomId: string, tenantId: string, amount: number) { ... }
export async function cancelBooking(roomId: string, tenantId: string) { ... }
export async function checkOutRoom(roomId: string, tenantId: string) { ... }
export async function extendRoom(tenantId: string, newCheckOutDate: Date, amount: number) { ... }
```

### Room Actions
```typescript
// src/app/actions/rooms.ts
export async function getRooms() { ... }
export async function createRoom(data: RoomFormValues) { ... }
export async function updateRoom(id: string, data: RoomFormValues) { ... }
export async function deleteRoom(id: string) { ... }
```

### Finance Actions
```typescript
// src/app/actions/finance.ts
export async function getTransactions() { ... }
export async function createExpense(data) { ... }
```

### CMS Actions
```typescript
// src/app/actions/cms.ts
export async function getCMSContent(key: string) { ... }
export async function updateCMSContent(key: string, value: any) { ... }
```

---

## 🎨 Key Components

### Dashboard Layout (with Auth Guard)
```tsx
// src/app/dashboard/layout.tsx
export default async function DashboardLayout({ children }) {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");
    
    return (
        <div className="min-h-screen bg-gray-100">
            <Sidebar />
            <div className="lg:pl-64">
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
```

### Room Card Component
```tsx
// src/components/admin/RoomCard.tsx
export function RoomCard({ room, onClick, onEdit, onDelete }) {
    // Color coding based on days left
    // Green: > 7 days
    // Orange: 3-7 days  
    // Red: < 3 days or overdue
}
```

### Currency Input (Formatted)
```tsx
// src/components/ui/currency-input.tsx
export function CurrencyInput({ value, onChange, placeholder }) {
    // Auto-formats numbers: 1500000 -> 1.500.000
}
```

---

## 🌐 Landing Page Components

| Component | Description |
|-----------|-------------|
| Navbar | Navigation with scroll sections |
| Hero | Main headline + CTA button |
| Facilities | Room features grid |
| RoomGallery | 6-card image gallery |
| Rules | House rules list |
| Pricing | Pricing tiers |
| MapSection | Google Maps embed |
| FAQ | Accordion Q&A |
| Footer | Contact + links |
| FloatingCTA | Sticky WhatsApp button |

---

## 💵 Number Formatting Utility

```typescript
// src/lib/format.ts
export function formatRupiah(amount: any): string {
    // 1500000 -> "1.500.000"
    return num.toLocaleString("id-ID");
}

export function parseRupiah(formatted: string): number {
    // "1.500.000" -> 1500000
}
```

---

## 📤 Image Upload API

```typescript
// src/app/api/upload/route.ts
export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.get("file");
    
    // Validate: JPEG, PNG, GIF, WebP only
    // Save to: public/uploads/gallery-{timestamp}.{ext}
    // Return: { success: true, url: "/uploads/filename.jpg" }
}
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push

# Seed admin user (password: admin123)
node prisma/seed.js

# Run dev server
npm run dev
```

---

## 🔑 Default Credentials

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |

---

## 📱 Responsive Design

All dashboard and landing page components are responsive using Tailwind CSS breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

Mobile-first grid layouts with:
- Room cards: 1 → 2 → 3 → 4 columns
- Dashboard stats: 2 → 4 columns
- Collapsible sidebar on mobile

---

# 📋 TUGAS PROPOSAL PROYEK

## Apa itu Proposal?

Sebuah **proposal** adalah dokumen yang merinci biaya dan jadwal proyek, serta menjelaskan langkah-langkah yang akan diambil oleh tim proyek untuk menghasilkan produk yang diinginkan.

- Proposal ditulis untuk **meyakinkan klien** agar membeli proyek dari tim proyek anda.
- Untuk proyek internal, manajemen sebaiknya meminta untuk membuat sebuah proposal. Hal ini untuk mendukung tim proyek untuk membuat rencana yang sederhana.

---

## Pendahuluan Perencanaan Proyek (PPP)

**The Preliminary Project Plan (PPP)** adalah dokumen internal, tidak perlu ditunjukkan ke user, terutama user luar.

- Perencanaan adalah sebuah proses yang berulang-ulang: rencana akan ditinjau secara terus menerus sesuai dengan perkembangan proyek dan sesuai dengan bertambahnya pengetahuan dan pemahaman yang lebih baik dari anggota tim.
- Pendahuluan Perencanaan Proyek adalah langkah awal, sumber daya, biaya dan jadwal yang dibutuhkan untuk menyelesaikan proyek.

---

## Struktur Proposal Proyek

### 1. Judul
Sama seperti dokumen studi kelayakan, halaman judul berisi:
- Nama Perusahaan klien
- Nama Proyek (jika belum ada nama, harap ditentukan sekarang)
- Versi saat ini
- Tanggal

### 2. Larangan dan Kerahasiaan (Disclaimer and Confidentiality)
Karena biasanya proposal mengandung informasi yang penting dan sensitif mengenai suatu sistem spesifik, maka harus ada pernyataan yang jelas mengenai larangan penyebaran dan sifat kerahasiaan dokumen.

### 3. Detail Publikasi
Terdiri atas tiga bagian:

| Bagian | Deskripsi |
|--------|-----------|
| **a. Tujuan Proposal** | Penjelasan mengenai tujuan dan diajukannya proposal ini serta audiens yang dituju. |
| **b. Versi Dokumen** | Daftar riwayat perubahan dokumen (jika ada) |
| **c. Otorisasi Dokumen** | Menandakan bahwa dokumen ini resmi dan dapat dipertanggungjawabkan oleh pihak pembuatnya. |

### 4. Pendahuluan
Jelaskan dalam dua atau tiga paragraf untuk gambaran mengenai latar belakang tim/perusahaan pelaksana proyek, dan pengalaman menangani proyek sejenis.

### 5. Ringkasan Eksekutif
Penjelasan singkat mengenai masing-masing subbagian dalam proposal.

### 6. Tujuan Proposal secara Bisnis (Business Objectives)
Tuliskan tujuan dari implementasi dengan peningkatannya dari sisi bisnis. Pada bagian ini berbeda dengan tujuan proposal umum.

### 7. Analisis Kebutuhan
Pembahasan secara ringkas mengenai requirements yang telah disetujui dan akan menjadi bagian dari pelaksanaan proyek.

### 8. Hasil/Solusi yang Diajukan (Proposed Deliverables/Solution)
Selaras dengan tujuan proposal, maka bagian ini akan menjelaskan solusi yang diajukan untuk mencapai tujuan tersebut.

| Sub-bagian | Penjelasan |
|------------|------------|
| **a. Ringkasan Solusi** | Berisi ringkasan dan solusi yang diajukan dalam bentuk yang tidak teknis dan singkat. |
| **b. Penjelasan Detail** | Memberikan penjelasan secara detail, termasuk desain dan hal-hal teknis. |

### 9. Uraian Pekerjaan (Statement of Work)
Penjelasan tentang pekerjaan-pekerjaan yang akan dilaksanakan sesuai dengan solusi yang diajukan secara rinci dan komprehensif.

| Sub-bagian | Penjelasan |
|------------|------------|
| **a. Sasaran dan Tujuan** | Penjelasan mengenai sasaran dan tujuan dari pekerjaan yang dilakukan. |
| **b. Batasan dan Ruang Lingkup** | Berikan batasan-batasan dari pekerjaan, mana yang merupakan bagian dari pekerjaan proyek dan mana yang bukan. |
| **c. Fase** | Pembagian fase-fase pekerjaan sesuai dengan tahap-tahap pelaksanaannya. |
| **d. Pemahaman** | Penjelasan mengenai pemahaman untuk pekerjaan yang dilaksanakan seperti adanya penghentian proses yang berjalan dalam fase-fase tertentu. |

### 10. Rencana Implementasi/Pelaksanaan
Setelah uraian pekerjaan, berikut ini adalah penjelasan rinci mengenai pelaksanaan pekerjaannya.

| Sub-bagian | Penjelasan |
|------------|------------|
| **a. Skenario yang diajukan** | Berikan skenario dari pelaksanaan pekerjaan, berupa hasil-hasil yang akan didapatkan jika pekerjaan telah dilaksanakan. |
| **b. Organisasi Proyek** | Penjelasan mengenai organisasi dalam tim proyek, bisa dilengkapi dengan bagan organisasi. |
| **c. Wewenang dan Tanggung Jawab** | Penjelasan detail mengenai wewenang dan tanggung jawab dari masing-masing posisi tim pelaksana proyek. |
| **d. Rencana Kerja Proyek** | Selaras dengan pekerjaan yang telah diuraikan, bagian ini akan menjelaskan mengenai rencana kerja proyek secara detail termasuk dengan jadwal pelaksanaan masing-masing pekerjaan. |
| **e. Laporan Progres** | Berikan penjelasan mengenai progres yang telah dicapai sampai dengan saat proposal ini diajukan. |
| **f. Tim Proyek yang diajukan** | Berikan nama-nama dari anggota tim dan posisi masing-masing dalam organisasi proyek. |
| **g. Logistik** | Bila diperlukan logistik tertentu dalam pelaksanaan pekerjaan, dapat diuraikan pada bagian ini. |

### 11. Investasi
Bagian ini memberikan gambaran mengenai biaya dari proyek ini.

| Sub-bagian | Penjelasan |
|------------|------------|
| **a. Biaya yang dikenakan** | Penjelasan mengenai biaya dapat dibuat dalam bentuk rekapitulasi pekerjaan dan biaya yang dikenakan untuk masing-masing pekerjaan tersebut. |
| **b. Syarat dan Kondisi** | Tentukan syarat dan kondisi dari pelunasan, biaya, berapa persentase pada masing-masing fase. |

### 12. Kriteria Penyelesaian
Penjelasan mengenai kriteria di mana proyek dapat dinyatakan selesai.

### 13. Support Setelah Proyek Selesai
Setelah proyek selesai, biasanya ada masa pemeliharaan, maka jelaskan mengenai uraian dari dukungan teknis (technical support) terhadap pelaksanaan pemeliharaan tersebut.

### 14. Batasan-batasan
Selain kriteria, proyek juga memiliki batasan-batasan di mana ada hal-hal yang tidak diubah atau dipengaruhi selama dan setelah proyek berlangsung.

### 15. Lain-lain
Bila ada penjelasan lain-lain yang perlu ditambahkan, sebaiknya juga disebutkan dalam proposal.

### 16. Penutup
Berikan kata-kata penutup untuk proposal ini, disertai dengan bagian tanda tangan dari pihak yang mengajukan proposal.

---

## Business Proposal (Komersial)

Untuk proposal komersial, proposal harus mencantumkan **analisis finansial** berupa:

| Analisis | Keterangan |
|----------|------------|
| **Analisis ROI** | Return on Investment |
| **Analisis Payback Period** | Periode pengembalian modal |
| **Analisis IRR** | Internal Rate of Return |
| **Analisis NPV** | Net Present Value |
| **Analisis BEP** | Break Even Point (Optional) |

---

## Tema Tugas Proposal

1. Proposal Konferensi
2. Proposal Penelitian
3. Proposal Pengabdian Masyarakat
4. **Proposal Pembuatan Perangkat Lunak** ✅
5. Proposal Bisnis

---

## Ketentuan Tugas

| Ketentuan | Detail |
|-----------|--------|
| **Jenis** | Tugas Kelompok |
| **Maksimum Kelompok** | 10 kelompok per kelas |
| **Maksimum Anggota** | 5 orang per kelompok |
| **Format Upload** | PDF |
| **Platform** | MyKlass |
| **Deadline** | Selasa, 7 Januari 2025 pukul 23:59 |

---

## 🎯 SELAMAT MENGERJAKAN!
