new Vue({
  el: "#trackingApp",

  data: {
    paketList: paketBahanAjar,
    trackingData: trackingDO,

    DOList: Object.values(trackingDO),

    selectedPaket: null,
    nomorCari: "",
    hasilTracking: null,

    newDO: {
      nim: "",
      nama: "",
      ekspedisi: "",
      tanggalKirim: ""
    }
  },

  computed: {
    nextDO() {
      const tahun = new Date().getFullYear();
      const nomorUrut = String(this.DOList.length + 1).padStart(4, "0");
      return "DO" + tahun + "-" + nomorUrut;
    }
  },

  methods: {
    addDO() {
      if (
        !this.newDO.nim ||
        !this.newDO.nama ||
        !this.newDO.ekspedisi ||
        !this.selectedPaket ||
        !this.newDO.tanggalKirim
      ) {
        alert("Semua data Delivery Order harus diisi!");
        return;
      }

      const nomorBaru = this.nextDO;

      const orderBaru = {
        nomorDO: nomorBaru,
        nim: this.newDO.nim,
        nama: this.newDO.nama,
        ekspedisi: this.newDO.ekspedisi,
        tanggalKirim: this.newDO.tanggalKirim,
        paket: this.selectedPaket.kode,
        namaPaket: this.selectedPaket.nama,
        total: this.selectedPaket.harga,
        status: "Diproses",
        perjalanan: [
          {
            waktu: this.getWaktuSekarang(),
            keterangan: "Pesanan berhasil dibuat"
          },
          {
            waktu: this.getWaktuSekarang(),
            keterangan: "Pesanan sedang diproses oleh petugas"
          }
        ]
      };

      this.trackingData[nomorBaru] = orderBaru;
      this.DOList.push(orderBaru);

      this.newDO = {
        nim: "",
        nama: "",
        ekspedisi: "",
        tanggalKirim: ""
      };

      this.selectedPaket = null;

      alert("Delivery Order berhasil ditambahkan! Nomor DO: " + nomorBaru);
    },

    cariTracking() {
      const nomor = this.nomorCari.trim().toUpperCase();

      if (!nomor) {
        alert("Masukkan nomor DO terlebih dahulu!");
        return;
      }

      if (this.trackingData[nomor]) {
        this.hasilTracking = this.trackingData[nomor];
      } else {
        this.hasilTracking = null;
        alert("Nomor DO tidak ditemukan!");
      }
    },

    resetTracking() {
      this.nomorCari = "";
      this.hasilTracking = null;
    },

    getWaktuSekarang() {
      const now = new Date();

      const tahun = now.getFullYear();
      const bulan = String(now.getMonth() + 1).padStart(2, "0");
      const tanggal = String(now.getDate()).padStart(2, "0");
      const jam = String(now.getHours()).padStart(2, "0");
      const menit = String(now.getMinutes()).padStart(2, "0");
      const detik = String(now.getSeconds()).padStart(2, "0");

      return `${tahun}-${bulan}-${tanggal} ${jam}:${menit}:${detik}`;
    },

    formatRupiah(angka) {
      return Number(angka).toLocaleString("id-ID");
    }
  },

  watch: {
    selectedPaket(newValue) {
      if (newValue) {
        console.log("Paket dipilih:", newValue.nama);
      }
    },

    DOList: {
      handler() {
        console.log("Data Delivery Order berubah");
      },
      deep: true
    }
  }
});