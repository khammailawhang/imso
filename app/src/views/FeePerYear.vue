<template>
  <v-app>
    <v-content>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2 class="red--text">Report income per year</h2>
          </v-col>
          <v-col cols="12">
              <v-card elevation="20">
                  <v-card-text>
                      <line-chart v-if="loaded" :chartdata="chartdata" :options="options" />
                      <span v-for="item in peryears" :key="item.fee_id">
                          <p>Total: LAK {{item.price | formatNumber}}</p>
                      </span>
                  </v-card-text>
              </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";
import numeral from "numeral";
Vue.use(VueAxios, axios);
import LineChart from "@/components/FeePerYear.vue";
Vue.filter("formatNumber", function (value) {
    return numeral(value).format("0,0.00");
});
export default {
  components: { LineChart },
  data: () => ({
    loaded: false,
    chartdata: null,
    options: null,
    peryears:[],
  }),
  async mounted() {
    this.loaded = false;
    axios
      .get("/api/fee/year")
      .then(res => {
        console.log(res);
        this.loaded = true;
        (this.chartdata = {
          labels: res.data.map(item => item.created_at),
          datasets: [
            {
              label: "Income per year",
              backgroundColor: "#E91E63",
              data: res.data.map(item => item.price)
            }
          ]
        }),
          (this.options = {
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var value = Number(
                    data.datasets[0].data[tooltipItem.index]
                  ).toFixed(2);
                  return "Total: LAK " + value;
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
                  display: true,
                  type: "time",
                  time: {
                    tooltipFormat: "YYYY",
                    unit: "year"
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
          });
      })
      .catch(error => {
        console.error(error);
      });
  },
  created(){
      this.getPeryear();
  },
  methods:{
      async getPeryear(){
          await this.axios.get("/api/fee/peryear")
          .then(res => {
              console.log(res);
              this.peryears = res.data.peryears;
          })
          .catch(err =>{
              console.log(err);
          })
      }
  }
};
</script>
