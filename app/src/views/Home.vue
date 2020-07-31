<template>
  <div>
    <v-content>
      <v-container>
        <v-row>
          <v-col cols="12"><h1>Title</h1></v-col>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="branchs"
              class="elevation-1"
            ></v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>
<script>
import Vue from  'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(VueAxios,axios)
export default {
  data:()=>({
    headers:[
      {
        text:"Name",value:"branch_name"
      }
    ],
    branchs:[],
  }),
  created(){
    this.getData();
  },
  methods:{
    getData(){
      this.axios.get("/api/branch").then(res=>{
        this.branchs = res.data.branchs;
      })
    }
  }
}
</script>