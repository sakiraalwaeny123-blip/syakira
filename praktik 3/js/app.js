new Vue({
    el: "#app",

    data: {
        tab: "stok",

        upbjjList: [],
        kategoriList: [],
        pengirimanList: [],
        paket: [],
        stok: [],
        tracking: []
    },

    mounted() {
        this.loadData();
    },

    methods: {
        async loadData() {
            try {
                const data = await ApiService.getDataBahanAjar();

                this.upbjjList = data.upbjjList;
                this.kategoriList = data.kategoriList;
                this.pengirimanList = data.pengirimanList;
                this.paket = data.paket;
                this.stok = data.stok;
                this.tracking = data.tracking;

                console.log("Data bahan ajar berhasil dibaca:", data);
            } catch (error) {
                alert(error.message);
                console.error(error);
            }
        }
    }
});