<template>
  <div class="flex w-full h-full min-h-screen">
    <div class="flex flex-col w-full h-full px-4">
      <div class="flex flex-col w-full mt-5 mb-10 justify-center items-center">
        <div v-for="(prov, index) in gettingObj"
             :key="index+'prov'">
          <h3 v-if="prov['attributes']['FID'] === selected">Provinsi {{prov['attributes']['Provinsi']}}</h3>
        </div>
          <span class="text-xs text-gray-700">per {{currendate | dateFormat('noTime')}}</span>
        <no-ssr>
          <Chartjs :selected="selected" />
        </no-ssr>
        <span class="text-xs text-gray-600 italic">sumber: https://bnpb-inacovid19.hub.arcgis.com/</span>
      </div>
      <div class="flex w-full bg-white rounded border border-gray-300 appearance-none my-1 leading-tight py-2 pl-2">
        <SelectOption class="flex w-full text-gray-700"
                      :items="gettingObj"
                      @change="val => selected = val['attributes']['FID']"
                      v-model="selected" />
      </div>

      <table class="table-auto mb-24 text-xs">
        <thead>
          <tr>
            <th class="py-2">Provinsi</th>
            <th class="px-1 py-2">Positif</th>
            <th class="px-1 py-2">Sembuh</th>
            <th class="px-1 py-2">Meninggal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(datTable, idx) in gettingObj"
              :key="idx+'table'"
              v-show="datTable['attributes']['FID'] === selected"
              class="text-center">
            <td class="border px-4 py-2">{{datTable['attributes']['Provinsi']}}</td>
            <td class="border py-2">{{datTable['attributes']['Kasus_Posi']}}</td>
            <td class="border py-2">{{datTable['attributes']['Kasus_Semb']}}</td>
            <td class="border py-2">{{datTable['attributes']['Kasus_Meni']}}</td>
          </tr>
        </tbody>
      </table>

    </div>
    <div class="container fixed bottom-0 left-0 right-0 w-full">
      <menuBottom />
    </div>
  </div>
</template>

<script>
import menuBottom from '@/components/menuBottom'
import SelectOption from '@/components/SelectOption'
import Chartjs from "@/components/sample";

import Close from '@/assets/svg/close.svg'

export default {
  components: {
    menuBottom,
    SelectOption,
    Chartjs,
    Close
  },
  data() {
    return {
      showModal: true,
      data: [],
      selected: undefined,
      currendate: ''
    }
  },
  mounted() {
    this.fetchData()
    this.currendate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
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