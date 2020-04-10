<template>
  <div class="card">
    <div class="card-img-bottom">
      <chartjs-doughnut 
        :bind="true"
        :datasets="datasets"
        :labels="labels"
        :option="option" 
      />
    </div>
    <div>
      <!-- Total : {{datasets}} -->
    </div>
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
  data() {
    return {
      labels: ["Positif", "Sembuh", "Meninggal"],
      option: {}
    };
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
    datasets() {
      let temp = []
      for(let i in this.selectData) {
        temp.push({
            data: [this.selectData[i]['Kasus_Posi'], this.selectData[i]['Kasus_Semb'], this.selectData[i]['Kasus_Meni']],
            backgroundColor: ["#f36e60", "#ffdb3b", "#185190"],
            hoverBackgroundColor: ["#fbd2cd", "#fef5c9", "#d1e3f7"]
        })
      }
      return temp
    },
  },
  watch: {
    data: function() {
      this._chart.destroy();
      //this.renderChart(this.data, this.options);
      this.datasets();
    }
  }

};
</script>