Vue.component("order-form", {
    props: ["paket", "ekspedisi"],

    template: "#tpl-order",

    data() {
        return {
            form: {
                nim: "",
                nama: "",
                paket: "",
                ekspedisi: ""
            }
        };
    },

    computed: {
        paketDipilih() {
            return this.paket.find(p => p.kode === this.form.paket);
        }
    },

    methods: {
        simpanDO() {
            if (
                this.form.nim === "" ||
                this.form.nama === "" ||
                this.form.paket === "" ||
                this.form.ekspedisi === ""
            ) {
                alert("Semua data pemesanan wajib diisi");
                return;
            }

            const tahun = new Date().getFullYear();
            const nomorDO = "DO" + tahun + "-" + String(Date.now()).slice(-3);

            alert(
                "Pemesanan berhasil disimpan\n" +
                "Nomor DO: " + nomorDO + "\n" +
                "Nama: " + this.form.nama
            );

            this.form = {
                nim: "",
                nama: "",
                paket: "",
                ekspedisi: ""
            };
        }
    }
});