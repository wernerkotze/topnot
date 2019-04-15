import axios from 'axios'
import * as firebase from 'firebase'

const state = {
  loadedHairdressers: [
    {
      firstname: 'Rabbo',
      lastname: 'Pasch',
      bio: 'weaht ',
      company: 'My Own Companyy',
      imageUrl: 'my image',
      age: null,
      companyName:'My Own companyName',
      companyAddr:'My Own companyAddr',
      companyLat :'My Own companyLat',
      companyLong :'My Own companyLong',
      hashtags : 'My Own hashTags',
    }
  ]
},

getters = {
    loadedHairdressers (state) {
      return state.loadedHairdressers.sort((hairDressersA, hairDressersB) => {
        return hairDressersA.date > hairDressersB.date
      })
    },
    featuredHairdressers (state, getters) {
      return getters.loadedHairdressers.slice(0, 11)
    },
    loadedHairdresser (state) {

      return (hairdesserId) => {
        return state.loadedHairdressers.find((hairdesser) => {
          return hairdesser.id === hairdesserId
        })
      }
    }
},

mutations = {
  setLoadedHairdressers (state, payload) {
  state.loadedHairdressers = payload
  },
  createHairdresser (state, payload) {
    state.loadedHairdressers.push(payload)
  },
  updateHairdresser (state, payload) {
    const hairdesser = state.loadedHairdressers.find(hairdesser => {
      return hairdesser.id === payload.id
    })
    if (payload.firstname) {
      hairdesser.firstname = payload.firstname
    }
    if (payload.lastname) {
      hairdesser.lastname = payload.lastname
    }
    if (payload.companyAddr) {
      hairdesser.companyAddr = payload.companyAddr
    }
  }
},

actions = {
    loadHairdressers ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('hairdressers').once('value')
        .then((data) => {
          const hairdresser = []
          const obj = data.val()
          for (let key in obj) {
            hairdresser.push({
              id: key,
              age: obj[key].age,
              firstname: obj[key].firstname,
              lastname: obj[key].lastname,
              bio: obj[key].bio,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId,
              companyName:obj[key].companyName,
              companyAddr:obj[key].companyAddr,
              companyLat : obj[key].companyLat,
              companyLong : obj[key].companyLong,
              hashtags : obj[key].hashtags,
            })
          }
          commit('setLoadedHairdressers', hairdresser)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createHairdresserProfile ({commit, getters}, payload) {
      const hairdesser = {
        firstname: payload.firstname,
        lastname: payload.lastname,
        imageUrl: payload.imageUrl,
        bio: payload.bio,
        age: payload.age,
        creatorId: getters.user.id,
        companyName:payload.companyName,
        companyAddr:payload.companyAddr,
        companyLat : payload.companyLat,
        companyLong : payload.companyLong,
        hashtags : payload.hashtags,
      }

      firebase.database().ref('hairdressers').push(hairdesser)
        .then((data) => {
          const key = data.key
          commit('createHairdresser', {
            ...hairdesser,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },
    updateHairdresserData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.firstname) {
        updateObj.firstname = payload.firstname
      }
      if (payload.lastname) {
        updateObj.lastname = payload.lastname
      }
      if (payload.companyAddr) {
        updateObj.companyAddr = payload.companyAddr
      }
      firebase.database().ref('hairdessers').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateHairdresser', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    }
}

export default {
  state,
  getters,
  mutations,
  actions
}
