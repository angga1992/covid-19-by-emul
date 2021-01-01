<template>
  <div class="flex w-full h-10 bg-green-800">
    <div class="flex w-full justify-between">
      <div class="flex w-full cursor-pointer h-full justify-center items-center">
        <div class="flex w-full">
          <div @click="home" class="flex w-1/2 border-r  justify-center items-center">
            <span class="text-white font-bold">Per Provinsi</span>
          </div>
          <div @click="all" class="flex w-1/2 border-r justify-center items-center">
            <span class="text-white font-bold">Semua</span>
          </div>
          <div @click="news" class="flex w-1/2  justify-center items-center">
            <span class="text-white font-bold">Berita</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        all() {
            this.$router.push({
                path: '/nasional'
            })
        },
        home() {
            this.$router.replace({
                path: '/'
            })
        },
        news () {
          this.$router.push({
                path: '/news'
            })
        }
    }
}
</script>
