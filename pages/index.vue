<template>
  <div class="flex w-full h-full min-h-screen">
    <div class="flex flex-col w-full h-full px-4">

      <div class="flex flex-col w-full mt-32 mb-10 justify-center items-center">
        <no-ssr>
          <Chartjs :selected="selected" />
        </no-ssr>
      </div>

      <div class="flex w-full bg-white rounded border border-gray-300 appearance-none my-1 leading-tight py-2 pl-2">
        <SelectOption class="flex w-full text-gray-700"
                      :items="gettingObj"
                      @change="val => selected = val['attributes']['FID']"
                      v-model="selected" />
      </div>

    </div>
    <div class="container fixed bottom-0 left-0 right-0 w-full">
      <menuBottom />
    </div>
    <Modal fullscreen
           v-model="showModal">
      <template #top>
        <div class="flex w-full bg-gray-300 p-3">
          <div class="flex w-full justify-between">
            <div class="flex w-full">
              <span>Untuk masuk aplikasi, klik tombol x di samping ---></span>
            </div>
            <button @click="showModal = false"
                    class="focus:outline-none">
              <Close />
            </button>
          </div>
        </div>
      </template>

      <template>
        <div class="flex flex-col w-full h-full">
          <h3>Aplikasi sederhana pemantauan penyebaran Covid</h3>
          <span>Data ini dari sumber terpercaya milik pemerintah (Open API)</span><br>
          <span>untuk menghindari fitnah atau informasi hoax</span><br>
          <span class="text-blue-700 underline">
            <a href="https://bnpb-inacovid19.hub.arcgis.com/datasets/covid19-indonesia-per-provinsi?geometry=90.204%2C-10.132%2C145.795%2C5.189" target="_blink">Berikut Link nya..</a></span>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import menuBottom from '@/components/menuBottom'
import SelectOption from '@/components/SelectOption'
import Chartjs from "@/components/sample";
import Modal from '@/components/modal'

import Close from '@/assets/svg/close.svg'

export default {
  components: {
    menuBottom,
    SelectOption,
    Chartjs,
    Modal,
    Close
  },
  data() {
    return {
      showModal: true,
      data: [],
      selected: undefined,
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    change(val) {
      console.log('val', val)
    },
    async fetchData() {
      await this.$store.dispatch('fetchListCovid')
    }
  },
  computed: {
    getCovid() {
      return this.$store.getters.getCovid
    },
    gettingObj() {
      return this.getCovid.map(items => {
        return {
          ...items,
          label: items['attributes']['Provinsi'],
          value: items['attributes']['FID']
        }
      })
    },
  }
}
</script>