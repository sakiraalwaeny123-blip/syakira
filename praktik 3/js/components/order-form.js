Vue.component("order-form", {
    props: ["paket", "ekspedisi", "tracking"],

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
            return this.paket.find(
                p => p.kode === this.form.paket
            );
        }
    },

    methods: {

        generateDONumber() {

            const tahun = new Date().getFullYear();

            const nomorUrut =
                String(this.tracking.length + 1)
                .padStart(4, "0");

            return `DO${tahun}-${nomorUrut}`;
        },

        simpanDO() {

            if (
                this.form.nim === "" ||
                this.form.nama === "" ||
                this.form.paket === "" ||
                this.form.ekspedisi === ""
            ) {
                alert("Semua data wajib diisi");
                return;
            }

            const paketDipilih =
                this.paket.find(
                    p => p.kode === this.form.paket
                );

            const nomorDO =
                this.generateDONumber();

            const tanggal =
                new Date()
                .toISOString()
                .split("T")[0];

            const dataBaru = {};

            dataBaru[nomorDO] = {

                nim: this.form.nim,

                nama: this.form.nama,

                status: "Pesanan Dibuat",

                ekspedisi: this.form.ekspedisi,

                tanggalKirim: tanggal,

                paket: this.form.paket,

                total: paketDipilih.harga,

                perjalanan: [
                    {
                        waktu: new Date().toLocaleString("id-ID"),

                        keterangan:
                            "Pesanan berhasil dibuat"
                    }
                ]
            };

            this.tracking.push(dataBaru);

            alert(
                "Pemesanan berhasil dibuat\n" +
                "Nomor DO : " + nomorDO
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
