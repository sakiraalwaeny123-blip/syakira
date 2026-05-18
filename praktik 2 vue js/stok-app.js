new Vue({
  el: "#stokApp",

  data: {
    dataBahanAjar: dataBahanAjar,

    selectedUpbjj: "",
    selectedKategori: "",
    sortKey: "judul",
    showOnlyLowStock: false,

    newItem: {
      kode: "",
      judul: "",
      kategori: "",
      upbjj: "",
      lokasiRak: "",
      qty: 0,
      safety: 0,
      harga: 0,
      catatanHTML: ""
    }
  },

  computed: {
    upbjjList() {
      return [...new Set(this.dataBahanAjar.map(item => item.upbjj))];
    },

    kategoriFiltered() {
      if (!this.selectedUpbjj) {
        return [];
      }

      let dataFilter = this.dataBahanAjar.filter(item => {
        return item.upbjj === this.selectedUpbjj;
      });

      return [...new Set(dataFilter.map(item => item.kategori))];
    },

    filteredSortedData() {
      let hasil = [...this.dataBahanAjar];

      if (this.selectedUpbjj !== "") {
        hasil = hasil.filter(item => item.upbjj === this.selectedUpbjj);
      }

      if (this.selectedKategori !== "") {
        hasil = hasil.filter(item => item.kategori === this.selectedKategori);
      }

      if (this.showOnlyLowStock) {
        hasil = hasil.filter(item => item.qty <= item.safety);
      }

      hasil.sort((a, b) => {
        if (this.sortKey === "judul") {
          return a.judul.localeCompare(b.judul);
        }

        return a[this.sortKey] - b[this.sortKey];
      });

      return hasil;
    }
  },

  methods: {
    statusText(item) {
      if (item.qty === 0) {
        return "Kosong";
      } else if (item.qty <= item.safety) {
        return "Menipis";
      } else {
        return "Aman";
      }
    },

    statusClass(item) {
      if (item.qty === 0) {
        return "badge danger";
      } else if (item.qty <= item.safety) {
        return "badge warning";
      } else {
        return "badge success";
      }
    },

    formatRupiah(angka) {
      return Number(angka).toLocaleString("id-ID");
    },

    updateItem(item) {
      alert("Data " + item.kode + " berhasil diperbarui!");
    },

    addItem() {
      if (
        !this.newItem.kode ||
        !this.newItem.judul ||
        !this.newItem.kategori ||
        !this.newItem.upbjj ||
        !this.newItem.lokasiRak
      ) {
        alert("Semua data bahan ajar harus diisi!");
        return;
      }

      const kodeSudahAda = this.dataBahanAjar.some(item => {
        return item.kode.toUpperCase() === this.newItem.kode.toUpperCase();
      });

      if (kodeSudahAda) {
        alert("Kode bahan ajar sudah digunakan!");
        return;
      }

      this.dataBahanAjar.push({
        kode: this.newItem.kode.toUpperCase(),
        judul: this.newItem.judul,
        kategori: this.newItem.kategori,
        upbjj: this.newItem.upbjj,
        lokasiRak: this.newItem.lokasiRak,
        qty: Number(this.newItem.qty),
        safety: Number(this.newItem.safety),
        harga: Number(this.newItem.harga),
        catatanHTML: this.newItem.catatanHTML
      });

      this.newItem = {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        qty: 0,
        safety: 0,
        harga: 0,
        catatanHTML: ""
      };

      alert("Data bahan ajar berhasil ditambahkan!");
    },

    resetFilter() {
      this.selectedUpbjj = "";
      this.selectedKategori = "";
      this.sortKey = "judul";
      this.showOnlyLowStock = false;
    }
  },

  watch: {
    selectedUpbjj() {
      this.selectedKategori = "";
    },

    dataBahanAjar: {
      handler() {
        console.log("Data stok bahan ajar berubah");
      },
      deep: true
    }
  }
});