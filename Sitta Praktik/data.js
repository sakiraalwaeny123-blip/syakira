// ============================================
// DATA SITTA - UNIVERSITAS TERBUKA
// Sistem Informasi Tracking & Tatalaksana Alat
// ============================================

// 👥 DATA PENGGUNA
var dataPengguna = [
  {
    id: 1,
    nama: "Rina Wulandari",
    email: "rina@ut.ac.id",
    password: "rina123",
    role: "UPBJJ-UT",
    lokasi: "UPBJJ Jakarta"
  },
  {
    id: 2,
    nama: "Agus Pranoto",
    email: "agus@ut.ac.id",
    password: "agus123",
    role: "UPBJJ-UT",
    lokasi: "UPBJJ Makassar"
  },
  {
    id: 3,
    nama: "Siti Marlina",
    email: "siti@ut.ac.id",
    password: "siti123",
    role: "Puslaba",
    lokasi: "Pusat"
  },
  {
    id: 4,
    nama: "Doni Setiawan",
    email: "doni@ut.ac.id",
    password: "doni123",
    role: "Fakultas",
    lokasi: "FISIP"
  },
  {
    id: 5,
    nama: "Admin SITTA",
    email: "admin@ut.ac.id",
    password: "admin123",
    role: "Administrator",
    lokasi: "Pusat"
  }
];

// 📚 DATA BAHAN AJAR
var dataBahanAjar = [
  {
    kodeLokasi: "0TMP01",
    kodeBarang: "ASIP4301",
    namaBarang: "Pengantar Ilmu Komunikasi",
    jenisBarang: "BMP",
    edisi: "2",
    stok: 548,
    cover: "img/pengantar_komunikasi.jpg"
  },
  {
    kodeLokasi: "0JKT01",
    kodeBarang: "EKMA4216",
    namaBarang: "Manajemen Keuangan",
    jenisBarang: "BMP",
    edisi: "3",
    stok: 392,
    cover: "img/manajemen_keuangan.jpg"
  },
  {
    kodeLokasi: "0SBY02",
    kodeBarang: "EKMA4310",
    namaBarang: "Kepemimpinan",
    jenisBarang: "BMP",
    edisi: "1",
    stok: 278,
    cover: "img/kepemimpinan.jpg"
  },
  {
    kodeLokasi: "0MLG01",
    kodeBarang: "BIOL4211",
    namaBarang: "Mikrobiologi Dasar",
    jenisBarang: "BMP",
    edisi: "2",
    stok: 165,
    cover: "img/mikrobiologi.jpg"
  },
  {
    kodeLokasi: "0UPBJJBDG",
    kodeBarang: "PAUD4401",
    namaBarang: "Perkembangan Anak Usia Dini",
    jenisBarang: "BMP",
    edisi: "4",
    stok: 204,
    cover: "img/paud_perkembangan.jpeg"
  }
];

// 📦 DATA TRACKING (FULLY FUNCTIONAL)
var dataTracking = {
  // Dalam Perjalanan - JNE
  "2023001234": {
    nomorDO: "2023001234",
    nama: "Rina Wulandari",
    status: "Dalam Perjalanan",
    ekspedisi: "JNE",
    tanggalKirim: "2024-12-15",
    paket: "0JKT01",
    total: "Rp 180.000",
    perjalanan: [
      {
        waktu: "2024-12-15 10:12:20",
        keterangan: "📥 Penerimaan di Loket: TANGERANG SELATAN",
        status: "received"
      },
      {
        waktu: "2024-12-15 14:07:56",
        keterangan: "🏢 Tiba di Hub: TANGERANG SELATAN",
        status: "arrived"
      },
      {
        waktu: "2024-12-15 16:30:10",
        keterangan: "🚚 Diteruskan ke Kantor Jakarta Selatan",
        status: "forwarded"
      }
    ]
  },
  
  // Selesai - Pos Indonesia
  "2023005678": {
    nomorDO: "2023005678",
    nama: "Agus Pranoto",
    status: "Selesai",
    ekspedisi: "Pos Indonesia",
    tanggalKirim: "2024-12-15",
    paket: "0UPBJJBDG",
    total: "Rp 220.000",
    perjalanan: [
      {
        waktu: "2024-12-15 10:12:20",
        keterangan: "📥 Penerimaan di Loket: TANGERANG SELATAN",
        status: "received"
      },
      {
        waktu: "2024-12-15 14:07:56",
        keterangan: "🏢 Tiba di Hub: TANGERANG SELATAN",
        status: "arrived"
      },
      {
        waktu: "2024-12-15 16:30:10",
        keterangan: "🚚 Diteruskan ke Kantor Kota Bandung",
        status: "forwarded"
      },
      {
        waktu: "2024-12-16 12:15:33",
        keterangan: "🏢 Tiba di Hub: Kota BANDUNG",
        status: "arrived"
      },
      {
        waktu: "2024-12-16 15:06:12",
        keterangan: "📦 Proses antar ke Cimahi",
        status: "delivering"
      },
      {
        waktu: "2024-12-16 20:00:00",
        keterangan: "✅ Selesai Antar - Penerima: Agus Pranoto",
        status: "delivered"
      }
    ]
  },
  
  // Dikirim - TIKI
  "2023009999": {
    nomorDO: "2023009999",
    nama: "Siti Marlina",
    status: "Dikirim",
    ekspedisi: "TIKI",
    tanggalKirim: "2024-12-16",
    paket: "0SBY02",
    total: "Rp 150.000",
    perjalanan: [
      {
        waktu: "2024-12-16 09:45:30",
        keterangan: "📥 Penerimaan di Loket: JAKARTA PUSAT",
        status: "received"
      },
      {
        waktu: "2024-12-16 13:20:15",
        keterangan: "🏢 Tiba di Hub: SURABAYA",
        status: "arrived"
      },
      {
        waktu: "2024-12-16 17:10:45",
        keterangan: "🚚 Dalam proses pengiriman ke tujuan",
        status: "forwarded"
      }
    ]
  }
};

// ============================================
// FUNGSI UTILITAS
// ============================================

// Format tanggal Indonesia
function formatTanggal(tanggal) {
  const date = new Date(tanggal);
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Format Rupiah
function formatRupiah(angka) {
  const cleanNumber = angka.replace(/[^\d]/g, '');
  return parseInt(cleanNumber).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR'
  });
}

// Filter stok berdasarkan keyword
function filterStok(keyword) {
  if (!keyword) return dataBahanAjar;
  const term = keyword.toLowerCase();
  return dataBahanAjar.filter(item =>
    item.namaBarang.toLowerCase().includes(term) ||
    item.kodeBarang.toLowerCase().includes(term) ||
    item.kodeLokasi.toLowerCase().includes(term)
  );
}

// Get tracking data
function getTracking(nomorDO) {
  return dataTracking[nomorDO] || null;
}

// Validasi user login
function isUserValid(email, password) {
  return dataPengguna.find(user => 
    user.email.toLowerCase() === email.toLowerCase() && 
    user.password === password
  );
}

// Cek apakah admin
function isAdmin(email) {
  const user = dataPengguna.find(u => u.email.toLowerCase() === email.toLowerCase());
  return user && user.role === "Administrator";
}

// Get status class untuk CSS
function getStatusClass(status) {
  switch(status.toLowerCase()) {
    case 'dalam perjalanan':
      return 'status-dalam-perjalanan';
    case 'dikirim':
      return 'status-dikirim';
    case 'selesai':
      return 'status-selesai';
    default:
      return 'status-pending';
  }
}

// Statistik aplikasi
var appData = {
  totalBarang: dataBahanAjar.length,
  totalStok: dataBahanAjar.reduce((sum, item) => sum + item.stok, 0),
  paketAktif: Object.keys(dataTracking).length,
  lowStock: dataBahanAjar.filter(item => item.stok < 200).length,
  trackingStats: {
    'Dalam Perjalanan': 1,
    'Dikirim': 1,
    'Selesai': 1
  }
};

// Debug info
console.log('✅ SITTA Data Loaded!');
console.log('📊 Stats:', appData);
console.log('👥 Users:', dataPengguna.length);
console.log('📦 Tracking:', Object.keys(dataTracking).length);