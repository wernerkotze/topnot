import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import Vuetify from 'vuetify'
import AlertCmp from '@/components/alert.vue'
import MaterialCard from '@/components/card.vue'
import Offset from '@/components/offset.vue'
import './stylus/main.styl'
import './styles/index.scss'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

import axios from 'axios'

import VueAnalytics from 'vue-analytics'

import App from '@/App.vue'
import * as firebase from 'firebase'
import './registerServiceWorker'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)
Vue.component('material-card', MaterialCard)
Vue.component('helper-offset', Offset)

// more info: https://github.com/MatteoGabriele/vue-analytics
// Vue.use(VueAnalytics, {
//   id: process.env.VUE_APP_GOOGLE_ANALYTICS,
//   router
// })

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    primary: '#512DA8',
    secondary: '#F5F5F5',
    accent: '#FFEB3B',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyBXEK2IakYa6zHX-bvvbIE7Ui6uG4qX5SM",
      authDomain: "topnot-74d6f.firebaseapp.com",
      databaseURL: "https://topnot-74d6f.firebaseio.com",
      projectId: "topnot-74d6f",
      storageBucket: "topnot-74d6f.appspot.com"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
}).$mount('#app')
