import { find } from 'lodash'

export default {
  address (state) {
    return state.address
  },
  long (state) {
    return state.long
  },
  lat (state) {
    return state.lat
  },
  /**
   * Check if a product has deletion pending
   */
  isProductDeletionPending: state => productId =>
    state.productDeletionPending.includes(productId),

  /**
   * Get product by id
   */
  getProductById: state => productId =>
    find(state.products, product => product.id === productId)
}
