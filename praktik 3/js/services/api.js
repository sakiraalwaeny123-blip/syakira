const ApiService = {
    async getDataBahanAjar() {
        const response = await fetch("data/dataBahanAjar.json");

        if (!response.ok) {
            throw new Error("File dataBahanAjar.json tidak dapat dibaca");
        }

        return await response.json();
    }
};