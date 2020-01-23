import GenericDB from './generic-db'

export default class UserDetailDB extends GenericDB {
  constructor(userId) {
    super(`users/${userId}/detail`)
  }

  // Here you can extend UserDetailDB with custom methods
}
