import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://lucasgomestechchallenge.herokuapp.com/'

Vue.use(VueMaterial)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
