import axios from 'axios'
import * as firebase from 'firebase'

const state = {
  user: null,
  loading: false,
  error: null
}

const getters = {
  user (state) {
    return state.user
  },
  loading (state) {
    return state.loading
  },
  error (state) {
    return state.error
  }
}

const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  clearError (state) {
    state.error = null
  }
}

const actions = {
  signUserUp ({ commit }, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then(function(user) {
      var ref = firebase.database().ref().child('/users/');
      var data = {
        email: payload.email,
        id: user.user.uid
      }
      ref.child(user.user.uid).set(data).then(function(ref){
        user => {
          const newUser = {
            id: user.user.uid
          }
          commit('setUser', newUser)
        }
      })
    }
    ).catch (
      error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      }
    )
  },
  signUserIn ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.user.uid
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
  },
  autoSignIn ({commit}, payload) {
    commit('setUser', {id: payload.uid})
  },
  clearError ({commit}) {
    commit('clearError')
  },
  logout ({commit}) {
    firebase.auth().signOut()
    commit('setUser', null)
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
