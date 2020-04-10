<template>
  <div class="flex flex-col w-full justify-center items-center">
    <h3>Data Pantauan Covid-19 seluruh provinsi indonesia</h3>
    <apexchart 
        width="400"
        height="300"
        type="donut"
        :options="chartOptions"
        :series="series"
    >
    </apexchart>
  </div>
</template>

<script>
export default {
  props: {
    selected: {
      type: Number | String,
      default: ''
    }
  },
  data: function () {
    return {
      chartOptions: {
            chart: {
              width: 500,
              type: 'pie',
            },
            labels: ['Positif', 'Sembuh', 'Meninggal'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },
    }
  },
  computed: {
    getCovidstore() {
      return this.$store.getters.getCovid
    },
    selectData() {
      var key = null
      var temp = []
      if (this.getCovidstore.length) {
        for (key in this.getCovidstore) {
          if (this.getCovidstore[key]['attributes']['FID'] == this.selected) {
            temp.push(this.getCovidstore[key]['attributes'])
          }
        }
        return temp

      }
    },
    series() {
      let temp = []
      for (let i in this.selectData) {
        temp.push(this.selectData[i]['Kasus_Posi'], this.selectData[i]['Kasus_Semb'], this.selectData[i]['Kasus_Meni'])

      }
      return temp
    },
  },
};
</script>