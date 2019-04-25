import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import router from '@/router'

import users from '@/store/services/users'
import maps from '@/store/services/maps'
import auth from '@/store/modules/auth'





Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    users,
    auth,
    maps
  }
})

export default store
