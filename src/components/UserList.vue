<template>
  <div>
    <p v-if="users === null" class="infos-label">Loading...</p>
    <p v-if="users && !users.length" class="infos-label">
      You don't have any product yet
    </p>
    <product-item
      v-for="(user, index) in users"
      :key="user.id"
      class="user-row"
      :index="index"
      :is-user-deletion-pending="isUserDeletionPending(user.id)"
      :disable-actions="!networkOnLine"
      :data="user"
      @deleteUser="deleteUserDetail"
    ></product-item>
  </div>
</template>

<script>
import UserItem from '@/components/UserItem'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: { UserItem },
  computed: {
    ...mapGetters('users', ['isUserDeletionPending']),
    ...mapState('users', ['users']),
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
