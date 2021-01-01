<template>
  <div class="flex w-full flex-col h-full min-h-screen">
    <!-- <label class="block w-full px-4">
      <span class="text-gray-700">Cari Berita</span>
      <input class="input mt-1 block w-1/2" placeholder="Covid-19" v-model="search" />
      <button @click="fetchNews()">cari</button>
    </label> -->
    <div class="p-8">
      <div class="bg-white flex items-center rounded-full shadow-md">
        <input
          class="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
          id="search"
          type="text"
          v-model="search"
          placeholder="Covid"
        />

        <div class="p-4">
          <button
            @click="fetchNews()"
            class="bg-green-500 text-white rounded-full hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                fill="#ffffff"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="text-xs px-4">Hasil Pencarian "{{search}}": {{getNews.length}}</div>
    <div v-if="getNews.length > 0">
        <div
        class="bg-white p-4 overflow-hidden w-full"
        v-for="(news, index) in getNews"
        :key="index"
        >
        <img
            @click="goUrl(news.url)"
            :src="news.urlToImage"
            :alt="news.name"
            class="w-full object-cover h-80 cursor-pointer "
        />
        <div class="p-2 cursor-pointer ">
            <span @click="goUrl(news.url)" class="font-semibold mb-2 text-sm">
            {{ news.title }}
            </span>
            <div class="text-sm flex items-center">
            <svg
                class="opacity-75 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                width="12"
                height="12"
                viewBox="0 0 97.16 97.16"
                style="enable-background: new 0 0 97.16 97.16"
                xml:space="preserve"
            >
                <path
                d="M48.58,0C21.793,0,0,21.793,0,48.58s21.793,48.58,48.58,48.58s48.58-21.793,48.58-48.58S75.367,0,48.58,0z M48.58,86.823    c-21.087,0-38.244-17.155-38.244-38.243S27.493,10.337,48.58,10.337S86.824,27.492,86.824,48.58S69.667,86.823,48.58,86.823z"
                />
                <path
                d="M73.898,47.08H52.066V20.83c0-2.209-1.791-4-4-4c-2.209,0-4,1.791-4,4v30.25c0,2.209,1.791,4,4,4h25.832    c2.209,0,4-1.791,4-4S76.107,47.08,73.898,47.08z"
                />
            </svg>
            <p class="leading-none">{{ news.publishedAt | dateFormat }}</p>
            </div>
        </div>
        <div class="border-b-4 border-green-500"></div>
        </div>
    </div>
    <div v-else>
        <h4 class="text-center">
            tidak ditemukan
        </h4>
    </div>
    <div class="container fixed bottom-0 left-0 right-0 w-full">
      <menuBottom />
    </div>
  </div>
</template>

<script>
import menuBottom from "@/components/menuBottom";

export default {
  components: {
    menuBottom,
  },
  data() {
    return {
      search: "covid",
      showCount: false
    };
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
    fetchNews() {
      this.$store.dispatch("fetchNews", this.search);
    },
    goUrl (params) {
    window.location.href = params
    }
  },
  computed: {
    getNews() {
      return this.$store.getters.getNews;
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  border: 1px solid grey;
  border-radius: 3px;
  height: 34px;
  padding-left: 10px;
  &:focus {
    outline: none;
    border: 1px solid green;
  }
}
</style>