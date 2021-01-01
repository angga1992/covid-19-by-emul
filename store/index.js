export const state = () => ({
    covid: [],
    news: []
})

export const mutations = {
    setCovid(state, covids) {
        state.covid = covids
    },
    setNews(state, news) {
        state.news = news
    },
}

export const getters = {
    getCovid: state => state.covid,
    getNews: state => state.news,
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
    async fetchNews({ state, commit, dispatch }, query) {
        let url = `https://newsapi.org/v2/top-headlines?country=id&q=${query}&apiKey=b1a5099f2cc041fd8d73bc6b886c2afe`
        await this.$axios
            .get(url)
            .then(response => {
                commit('setNews', response.data.articles)
            })
            .catch(error => {
                console.log(error);
            })
    },
}

