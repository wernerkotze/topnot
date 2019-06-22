import axios from 'axios'
import * as firebase from 'firebase'
import router from '@/router'

const state = {
  address : null,
  long : null,
  lat : null
}

const getters = {
  address (state) {
    return state.address
  },
  long (state) {
    return state.long
  },
  lat (state) {
    return state.lat
  }

}

const mutations = {
  setAddress (state, payload) {
    state.address = payload
  },
  setLong (state, payload) {
    state.long = payload
  },
  setLat (state, payload) {
    state.lat = payload
  },
  setRoute () {
    router.push({
      name:'dashboard'
    })
  }
}

const actions = {
  // Might need to work on the order of excecution here...
  locate ({commit}, payload) {
    commit('setLong', payload.long);
    commit('setLat' , payload.lat);
    commit('setAddress', payload.address);
    commit('setRoute');
  }
}

 export default {
  state,
  getters,
  mutations,
  actions
}
