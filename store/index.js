export const state = () => ({
    covid: [],
})

export const mutations = {
    setCovid(state, covids) {
        state.covid = covids
    },
}

export const getters = {
    getCovid: state => state.covid,
}

export const actions = {
    async fetchListCovid({ state, commit, dispatch }) {
        let url = "https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
        await this.$axios
            .get(url)
            .then(response => {
                // this.data = response.data.features
                commit('setCovid', response.data.features)
            })
            .catch(error => {
                console.log(error);
            })
    },
}

