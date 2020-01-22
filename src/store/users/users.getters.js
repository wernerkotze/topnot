import { find } from 'lodash'

export default {
  /**
   * Check if a user has deletion pending
   */
  isUserDeletionPending: state => productId =>
    state.UserDeletionPending.includes(userId),

  /**
   * Get user by id
   */
  getUserById: state => userId =>
    find(state.users, user => user.id === userId)
}
