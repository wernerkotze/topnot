import router from '@/router/index'

export default {

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
      name:'userfeed'
    })
  },
  /* Product input name */
  setProductNameToCreate: (state, productNameToCreate) =>
    (state.productNameToCreate = productNameToCreate),

  /* Products */
  setProducts: (state, products) => (state.products = products),
  addProduct: (state, product) => state.products.push(product),
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
  setProductCreationPending: (state, value) =>
    (state.productCreationPending = value)
}
