Vue.component("app-modal", {
    template: "#tpl-modal",

    data() {
        return {
            show: false,
            pesan: ""
        };
    },

    methods: {
        open(pesan) {
            this.pesan = pesan;
            this.show = true;
        },

        close() {
            this.show = false;
            this.pesan = "";
        }
    }
});