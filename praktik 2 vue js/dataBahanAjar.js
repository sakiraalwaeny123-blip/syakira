/* =====================================================
   DATA BAHAN AJAR SITTA UT
   File: js/dataBahanAjar.js
===================================================== */

/* DATA STOK BAHAN AJAR */
var dataBahanAjar = [
  {
    kode: "EKMA4116",
    judul: "Pengantar Manajemen",
    kategori: "MK Wajib",
    upbjj: "Jakarta",
    lokasiRak: "R1-A3",
    harga: 65000,
    qty: 28,
    safety: 20,
    catatanHTML: "<em>Edisi 2024, cetak ulang</em>"
  },
  {
    kode: "EKMA4115",
    judul: "Pengantar Akuntansi",
    kategori: "MK Wajib",
    upbjj: "Jakarta",
    lokasiRak: "R1-A4",
    harga: 60000,
    qty: 7,
    safety: 15,
    catatanHTML: "<strong>Cover baru</strong>"
  },
  {
    kode: "BIOL4201",
    judul: "Biologi Umum (Praktikum)",
    kategori: "Praktikum",
    upbjj: "Surabaya",
    lokasiRak: "R3-B2",
    harga: 80000,
    qty: 12,
    safety: 10,
    catatanHTML: "Butuh <u>pendingin</u> untuk kit basah"
  },
  {
    kode: "FISIP4001",
    judul: "Dasar-Dasar Sosiologi",
    kategori: "MK Pilihan",
    upbjj: "Makassar",
    lokasiRak: "R2-C1",
    harga: 55000,
    qty: 2,
    safety: 8,
    catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder"
  }
];


/* DATA PAKET BAHAN AJAR */
var paketBahanAjar = [
  {
    kode: "PAKET-UT-001",
    nama: "PAKET IPS Dasar",
    isi: [
      "EKMA4116 - Pengantar Manajemen",
      "EKMA4115 - Pengantar Akuntansi"
    ],
    harga: 120000
  },
  {
    kode: "PAKET-UT-002",
    nama: "PAKET IPA Dasar",
    isi: [
      "BIOL4201 - Biologi Umum (Praktikum)",
      "FISIP4001 - Dasar-Dasar Sosiologi"
    ],
    harga: 140000
  }
];


/* DATA TRACKING PESANAN / DELIVERY ORDER */
var trackingDO = {
  "DO2025-0001": {
    nomorDO: "DO2025-0001",
    nim: "123456789",
    nama: "Rina Wulandari",
    ekspedisi: "JNE Regular",
    tanggalKirim: "2025-08-25",
    paket: "PAKET-UT-001",
    namaPaket: "PAKET IPS Dasar",
    total: 120000,
    status: "Dalam Perjalanan",
    perjalanan: [
      {
        waktu: "2025-08-25 10:12:20",
        keterangan: "Pesanan diterima di Loket TANGSEL"
      },
      {
        waktu: "2025-08-25 14:07:56",
        keterangan: "Pesanan tiba di Hub JAKSEL"
      },
      {
        waktu: "2025-08-26 08:44:01",
        keterangan: "Pesanan diteruskan ke kantor tujuan"
      }
    ]
  },

  "DO2025-0002": {
    nomorDO: "DO2025-0002",
    nim: "987654321",
    nama: "Andi Saputra",
    ekspedisi: "JNE Express",
    tanggalKirim: "2025-08-27",
    paket: "PAKET-UT-002",
    namaPaket: "PAKET IPA Dasar",
    total: 140000,
    status: "Diproses",
    perjalanan: [
      {
        waktu: "2025-08-27 09:00:00",
        keterangan: "Pesanan berhasil dibuat"
      },
      {
        waktu: "2025-08-27 11:30:00",
        keterangan: "Pesanan sedang disiapkan oleh petugas"
      }
    ]
  }
};