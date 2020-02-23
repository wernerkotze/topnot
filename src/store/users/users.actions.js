import UserDetailDB from '@/firebase/users-detail-db'
import UsersDB from '@/firebase/users-db'

export default {
  /**
   * Fetch products of current loggedin user
   */
  getUserDetail: async ({ rootState, commit }) => {
    const usersDetailDB = new UserDetailDB(rootState.authentication.user.id)

    const users = await usersDetailDB.readAll()
    commit('setUserDetail', users)

  },

  getAllUsers: async ({rootState, commit}) => {
    const allusersDb = new UsersDB(rootState.authentication.user.id)

    const allusers = await allusersDb.readAll()
    commit('setAllUsers', allusers)
    console.log('heres rootState after!', rootState)
  },


  /**
   * Create a product for current loggedin user
   */
  createUser: async ({ commit, rootState }, user) => {
    const usersDetailDB = new UserDetailDB(rootState.authentication.user.id)

    commit('setUserCreationPending', true)
    const createdUser = await usersDetailDB.create(user)
    commit('addUserDetail', createdUser)
    commit('setUserCreationPending', false)
  },

  /**
   * Create a new product for current loggedin user and reset product name input
   */
  triggerAddUserAction: ({ dispatch, state, commit }) => {
    if (state.userDetailToCreate === '') return

    const user = { name: state.userDetailToCreate }
    commit('setUserDetailToCreate', '')
    dispatch('createUser', user)
  }
}
