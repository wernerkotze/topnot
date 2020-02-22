export default {

  /* User input detail */
  setUserDetailToCreate: (state, userDetailToCreate) =>
    (state.userDetailToCreate = userDetailToCreate),

  /* Products */
  setUserDetail: (state, users) => (state.users = users),
  addUserDetail: (state, user) => state.users.push(user),
  removeProductById: (state, productId) => {
    const index = state.products.findIndex(product => product.id === productId)
    state.products.splice(index, 1)
  },

  /* Products deletion */
  addProductDeletionPending: (state, productId) =>
    state.productDeletionPending.push(productId),
  removeProductDeletionPending: (state, productId) => {
    const index = state.products.findIndex(product => product.id === productId)
    state.productDeletionPending.splice(index, 1)
  },

  /* Product creation */
  setUserCreationPending: (state, value) =>
    (state.userCreationPending = value)
}
