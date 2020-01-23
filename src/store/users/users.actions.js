import UsersDetailDB from '@/firebase/users-detail-db'

export default {
  /**
   * Fetch products of current loggedin user
   */
  getUsers: async ({ rootState, commit }) => {
    const UsersDetailDB = new UsersDetailDB(rootState.authentication.user.id)

    const users = await UsersDetailDB.readAll()
    commit('setUsers', users)
  },

  /**
   * Create a product for current loggedin user
   */
  createUser: async ({ commit, rootState }, user) => {
    const UsersDetailDB = new UsersDetailDB(rootState.authentication.user.id)

    commit('setUserCreationPending', true)
    const createdUser = await UsersDetailDB.create(user)
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
