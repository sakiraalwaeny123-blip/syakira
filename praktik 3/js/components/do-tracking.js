Vue.component("do-tracking", {
    props: ["tracking"],

    template: "#tpl-tracking",

    data() {
        return {
            keyword: "",
            keteranganBaru: ""
        };
    },

    computed: {
        hasilTracking() {
            if (this.keyword === "") {
                return this.tracking;
            }

            return this.tracking.filter(item => {
                const nomorDO = Object.keys(item)[0];
                const dataDO = item[nomorDO];

                return (
                    nomorDO.toLowerCase().includes(this.keyword.toLowerCase()) ||
                    dataDO.nim.includes(this.keyword)
                );
            });
        }
    },

    methods: {
        resetCari() {
            this.keyword = "";
        },

        tambahProgress(data) {
            if (this.keteranganBaru === "") {
                alert("Keterangan perjalanan wajib diisi");
                return;
            }

            const sekarang = new Date();

            data.perjalanan.push({
                waktu: sekarang.toLocaleString("id-ID"),
                keterangan: this.keteranganBaru
            });

            data.status = "Dalam Perjalanan";
            this.keteranganBaru = "";
        }
    }
});