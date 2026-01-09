import {
  Wifi, Wind, Bath, ShieldCheck, Car, Coffee,
  Bed, LampDesk, Box, Maximize, Droplets, Utensils,
  Ban, Moon, UserX, Cigarette, Pill, HardHat
} from "lucide-react";

// ... (skipping unchanged lines)

// ... (skipping unchanged lines)

export const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Fasilitas", href: "#facilities" },
  { name: "Peraturan", href: "#rules" },
  { name: "Lokasi", href: "#location" },
  { name: "Harga", href: "#pricing" },
];

export const HERO_CONTENT = {
  headline: "Kost Eksklusif Nyaman & Lengkap",
  subheadline: "Fasilitas Hotel, Harga Kost. Gratis Token Listrik 100rb/bulan! Nikmati kenyamanan konsep Executive di PandawaX45.",
  ctaText: "Booking via WhatsApp",
  ctaLink: "https://wa.me/6285176880101?text=Halo,%20saya%20tertarik%20untuk%20booking%20kamar%20di%20Kost%20PandawaX45",
  usps: [
    "Free Token Listrik IDR 100k/month",
    "Executive Concept"
  ]
};

export const ROOM_SPECS = {
  size: "4.5 x 2.5 meter",
  type: "Executive Room (Max 1 orang/kamar)"
};

export const FACILITY_CATEGORIES = [
  {
    title: "Fasilitas Kamar",
    items: [
      { icon: Wind, name: "AC" },
      { icon: Bed, name: "Kasur (Bed)" },
      { icon: LampDesk, name: "Meja & Kursi Kerja" },
      { icon: Box, name: "Lemari & Meja Rias" },
      { icon: Maximize, name: "Cermin & Jendela" },
      { icon: ShieldCheck, name: "Cleaning Service" },
    ]
  },
  {
    title: "Kamar Mandi (Dalam)",
    items: [
      { icon: Bath, name: "Kamar Mandi Dalam" },
      { icon: Droplets, name: "Water Heater" },
      { icon: Bath, name: "Shower & Kloset Duduk" },
    ]
  },
  {
    title: "Fasilitas Umum",
    items: [
      { icon: Wifi, name: "High-Speed WiFi" },
      { icon: Utensils, name: "Kulkas & Dispenser Bersama" },
      { icon: ShieldCheck, name: "CCTV 24/7 & Access Card" },
      { icon: Car, name: "Parkir Motor & Sepeda" },
      { icon: HardHat, name: "Rak Helm" },
    ]
  }
];

export const FACILITIES = [
  ...FACILITY_CATEGORIES[0].items,
  ...FACILITY_CATEGORIES[1].items,
  ...FACILITY_CATEGORIES[2].items,
];

export const HOUSE_RULES = [
  { icon: UserX, rule: "Lawan jenis dilarang masuk kamar (No Mix Gender Visits)" },
  { icon: Ban, rule: "Dilarang bawa hewan peliharaan (No Pets)" },
  { icon: Cigarette, rule: "Dilarang merokok di dalam kamar (No Smoking in Room)" },
  { icon: Pill, rule: "Dilarang membawa obat-obatan terlarang (No Drugs)" },
  { icon: Moon, rule: "Ada jam malam (Quiet Hours Apply)" },
  { icon: UserX, rule: "Tidak untuk pasutri (No Married Couples)" },
];

export const ROOM_IMAGES = [
  { src: "https://images.unsplash.com/photo-1522771753037-63336198234c?q=80&w=1000&auto=format&fit=crop", alt: "Kamar Executive - Interior" },
  { src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop", alt: "Kamar Executive - Work Desk" },
  { src: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop", alt: "Kamar Mandi Dalam" },
  { src: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1000&auto=format&fit=crop", alt: "Fasilitas Umum" },
  { src: "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=1000&auto=format&fit=crop", alt: "Dapur Bersama" },
  { src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1000&auto=format&fit=crop", alt: "Ruang Tamu" },
];

export const PRICING_TIERS = [
  {
    name: "Executive Room",
    price: "Rp 1.600.000",
    period: "/ bulan",
    description: "Kamar nyaman dengan fasilitas lengkap. Tersedia opsi Harian dan Mingguan.",
    features: [
      "Termasuk Token Listrik 100rb",
      "Kamar Mandi Dalam + Water Heater",
      "AC & WiFi High Speed",
      "Cleaning Service",
      "Full Furnished",
      "Bisa Harian / Mingguan / Bulanan"
    ],
    isPopular: true,
  }
];

export const FAQS = [
  {
    question: "Apakah listrik sudah termasuk?",
    answer: "Kami memberikan GRATIS token listrik senilai Rp 100.000 setiap bulannya. Jika pemakaian melebihi itu, penyewa dapat mengisi sendiri.",
  },
  {
    question: "Apakah boleh berdua sekamar?",
    answer: "Tidak, kamar ini tipe Executive Room yang didesain maksimal untuk 1 orang per kamar.",
  },
  {
    question: "Bagaimana sistem keamanannya?",
    answer: "Kami menggunakan CCTV 24 jam dan sistem Access Card untuk pintu gerbang utama.",
  },
  {
    question: "Apakah ada opsi sewa jangka pendek?",
    answer: "Ya, kami menyediakan opsi sewa harian dan mingguan. Silakan hubungi admin untuk ketersediaan kamar.",
  },
];

export const CONTACT_INFO = {
  name: "PandawaX45",
  address: "Jl. Apokat No.45X, Perumnas Condong Catur, Condongcatur, Kec. Depok, Kabupaten Sleman, DIY 55281",
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660.2632531113295!2d110.40680442791789!3d-7.757676233759533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59007722c22b%3A0xab99762cd38e04a4!2sPandawaX45%20Kos!5e0!3m2!1sid!2sid!4v1767664677786!5m2!1sid!2sid",
  phone: "+62 851-7688-0101",
  socials: [
    { name: "Instagram", href: "https://www.instagram.com/pandawax45" },
  ],
  nearby: [
    { name: "Pakuwon Mall", time: "6 Menit" },
    { name: "UPN Yogyakarta", time: "4 Menit" }, // Shortened name for better layout
    { name: "UII FEB", time: "4 Menit" },
    { name: "Laundry", time: "1 Menit" },
  ]
};
