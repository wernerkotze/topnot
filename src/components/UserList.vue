<template>
  <div>
    <p v-if="allusers === null" class="infos-label">Loading... </p>
      <p v-if="allusers && !allusers.length" class="infos-label">
      Users not found...
    </p>
    <user-item
     v-for="(user, index) in allusers"
      :key="user.id"
      class="user-row"
      :index="index"
      :disable-actions="!networkOnLine"
      :data="user"
      @deleteUser="deleteUserDetail"
    ></user-item>
  </div>
</template>

<script>
import UserItem from '@/components/UserItem'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: { UserItem },
  computed: {
    ...mapGetters('users', ['isUserDeletionPending']),
    ...mapState('users', ['allusers']),
    ...mapState('app', ['networkOnLine'])
  },
  methods: mapActions('users', ['deleteUserDetail'])
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.infos-label {
  text-align: center;
}

.product-row {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 10px auto;
  justify-content: space-between;
}
</style>
