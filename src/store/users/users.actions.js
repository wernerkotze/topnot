import UsersDB from '@/firebase/users-db'

export default {
  /**
   * Fetch products of current loggedin user
   */
  getUsers: async ({ rootState, commit }) => {
    const UsersDB = new UsersDB(rootState.authentication.user.id)

    const users = await UsersDB.readAll()
    commit('setUsers', users)
  },

  /**
   * Create a product for current loggedin user
   */
  createUser: async ({ commit, rootState }, user) => {
    const UsersDB = new UsersDB(rootState.authentication.user.id)

    commit('setUserCreationPending', true)
    const createdUser = await UsersDB.create(user)
    commit('addUser', createdUser)
    commit('setUserCreationPending', false)
  },

  /**
   * Create a new product for current loggedin user and reset product name input
   */
  triggerAddUser: ({ dispatch, state, commit }) => {
    if (state.userDetailToCreate === '') return

    const user = { name: state.userDetailToCreate }
    commit('setUserDetailToCreate', '')
    dispatch('createUser', user)
  }
}
