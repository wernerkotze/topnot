import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueLocalStorage from 'vue-localstorage'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/misc/register-service-worker'
import '@/misc/handle-network-status'
import '@/firebase/init'
import '@/firebase/authentication'
import '@/misc/handle-apple-install-prompt'
import 'pwacompat'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

Vue.use(VueLocalStorage)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBXEK2IakYa6zHX-bvvbIE7Ui6uG4qX5SM',
    libraries: 'places,geometry',
    v: 3
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

console.log(`
🏢 Powered by Top Company 🏢

👉 https://topcompany.io/
`)
