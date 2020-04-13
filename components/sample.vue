<template>
  <div class="flex flex-col w-full justify-center items-center">
    <apexchart 
        width="450"
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
      if (this.selected !== '') {
        for (let i in this.selectData) {
          temp.push(this.selectData[i]['Kasus_Posi'], this.selectData[i]['Kasus_Semb'], this.selectData[i]['Kasus_Meni'])

        }
        return temp
      } else {
        return temp = [this.Positif, this.Sembuh, this.Meninggal]
      }
    },
    Positif() {
      let temp = []
      let total = 0
      if (this.getCovidstore.length) {
        for (let i in this.getCovidstore) {
          temp.push(this.getCovidstore[i]['attributes']['Kasus_Posi'])
        }
        for (let j = 0; j < temp.length; j++) {
          total += temp[j]
        }
        return total
      }
    },
    Meninggal() {
      let temp = []
      let total = 0
      if (this.getCovidstore.length) {
        for (let i in this.getCovidstore) {
          temp.push(this.getCovidstore[i]['attributes']['Kasus_Meni'])
        }
        for (let j = 0; j < temp.length; j++) {
          total += temp[j]
        }
        return total
      }
    },
    Sembuh() {
      let temp = []
      let total = 0
      if (this.getCovidstore.length) {
        for (let i in this.getCovidstore) {
          temp.push(this.getCovidstore[i]['attributes']['Kasus_Semb'])
        }
        for (let j = 0; j < temp.length; j++) {
          total += temp[j]
        }
        return total
      }
    },
    shapeChart() {
      let temp = []
      return temp = [this.Positif, this.Sembuh, this.Meninggal]
    }
  },
};
</script>