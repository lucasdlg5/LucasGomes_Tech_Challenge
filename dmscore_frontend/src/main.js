import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'

import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://lucasgomestechchallenge.herokuapp.com/'

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
