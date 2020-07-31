<template>
  <div class="container">
    <bar-chart
      v-if="loaded"
      :chartdata="chartdata"
      :options="options"/>
  </div>
</template>
<script>
import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";
import numeral from "numeral";
Vue.use(VueAxios, axios);
import BarChart from '@/components/BarChart.vue'
export default {
  components: { BarChart },
  data: () => ({
    loaded: false,
    chartdata: null,
    options:null
  }),
  async mounted () {
    this.loaded = false
    axios.get("/api/fee")
    .then(res =>{
        console.log(res);
        this.loaded = true;
        this.chartdata = {
            labels: res.data.map(item => item.date),
            datasets: [
                {
                label: 'Money',
                backgroundColor: '#f87979',
                data: res.data.map(item => item.price)
                }
            ]
            },
            this.options = {
              tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var value = Number(
                    data.datasets[0].data[tooltipItem.index]
                  ).toFixed(2);
                  return " LAK " + value;
                }
              }
            },
            scales: {
              ticks: {
                suggestedMin: 50,
                suggestedMax: 100
              },
              xAxes: [
                {
                  type: "time",
                  time: {
                    tooltipFormat: "DD/MM/YYYY HH:mm a",
                    unit: "month"
                  }
                }
              ],
              yAxes: [
                {
                  ticks: {
                    callback: function(value) {
                      return numeral(value).format("0a");
                    }
                  }
                }
              ]
            },
            responsive: true,
            maintainAspectRatio: false
            }
    })
    .catch(error => {
        console.error(error)
    })
  }
}
</script>
