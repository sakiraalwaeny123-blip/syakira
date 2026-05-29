Vue.component("ba-stock-table", {
    props: ["items", "upbjjList", "kategoriList"],

    template: "#tpl-stock",

    data() {
        return {
            filterUpbjj: "",
            filterKategori: "",
            hanyaReorder: false,
            sortBy: "",

            editIndex: null,

            form: {
                kode: "",
                judul: "",
                kategori: "",
                upbjj: "",
                lokasiRak: "",
                harga: "",
                qty: "",
                safety: "",
                catatanHTML: ""
            }
        };
    },

    computed: {
        hasilFilter() {
            let data = this.items;

            if (this.filterUpbjj !== "") {
                data = data.filter(item => item.upbjj === this.filterUpbjj);
            }

            if (this.filterKategori !== "") {
                data = data.filter(item => item.kategori === this.filterKategori);
            }

            if (this.hanyaReorder) {
                data = data.filter(item => item.qty < item.safety || item.qty === 0);
            }

            if (this.sortBy === "judul") {
                data = data.slice().sort((a, b) => a.judul.localeCompare(b.judul));
            }

            if (this.sortBy === "stok") {
                data = data.slice().sort((a, b) => a.qty - b.qty);
            }

            if (this.sortBy === "harga") {
                data = data.slice().sort((a, b) => a.harga - b.harga);
            }

            return data;
        }
    },

    watch: {
        filterUpbjj() {
            this.filterKategori = "";
        },

        hanyaReorder(value) {
            console.log("Filter reorder berubah:", value);
        }
    },

    methods: {
        formatRupiah(angka) {
            return "Rp " + Number(angka).toLocaleString("id-ID");
        },

        simpanData() {
            if (
                this.form.kode === "" ||
                this.form.judul === "" ||
                this.form.kategori === "" ||
                this.form.upbjj === "" ||
                this.form.lokasiRak === "" ||
                this.form.harga === "" ||
                this.form.qty === "" ||
                this.form.safety === ""
            ) {
                alert("Semua data stok wajib diisi");
                return;
            }

            const dataBaru = {
                kode: this.form.kode,
                judul: this.form.judul,
                kategori: this.form.kategori,
                upbjj: this.form.upbjj,
                lokasiRak: this.form.lokasiRak,
                harga: Number(this.form.harga),
                qty: Number(this.form.qty),
                safety: Number(this.form.safety),
                catatanHTML: this.form.catatanHTML
            };

            if (this.editIndex === null) {
                this.items.push(dataBaru);
                alert("Data bahan ajar berhasil ditambahkan");
            } else {
                this.$set(this.items, this.editIndex, dataBaru);
                alert("Data bahan ajar berhasil diperbarui");
            }

            this.resetForm();
        },

        editData(item) {
            this.editIndex = this.items.indexOf(item);

            this.form = {
                kode: item.kode,
                judul: item.judul,
                kategori: item.kategori,
                upbjj: item.upbjj,
                lokasiRak: item.lokasiRak,
                harga: item.harga,
                qty: item.qty,
                safety: item.safety,
                catatanHTML: item.catatanHTML
            };
        },

        hapusData(item) {
            const index = this.items.indexOf(item);

            if (confirm("Yakin ingin menghapus data bahan ajar ini?")) {
                this.items.splice(index, 1);
            }
        },

        resetForm() {
            this.editIndex = null;

            this.form = {
                kode: "",
                judul: "",
                kategori: "",
                upbjj: "",
                lokasiRak: "",
                harga: "",
                qty: "",
                safety: "",
                catatanHTML: ""
            };
        },

        resetFilter() {
            this.filterUpbjj = "";
            this.filterKategori = "";
            this.hanyaReorder = false;
            this.sortBy = "";
        }
    }
});