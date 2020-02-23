<template>
  <div class="user-item">
    <router-link
      class="user-link"
      :to="{ name: 'allusers', params: { id: allusers } }"
    >
      #{{ index }} {{ allusers.id }}
    </router-link>
     
    <div
      v-if="!disableActions"
      class="delete-btn"
      @click="$emit('deleteUser', allusers.id)"
    >
      {{ isUserDeletionPending ? 'delete in progress...' : 'delete' }}
    </div>
  </div>
</template>

<script>
export default {
    props: {
    allusers: Object,
    index: Number,
    isUserDeletionPending: Boolean,
    disableActions: Boolean
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .user-link {
    color: $vue-color;
  }

  .delete-btn {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid;
    display: inline-block;
    border-radius: 3px;
    margin-left: 10px;
    color: $danger-color;
    border-color: $danger-color;
  }
}
</style>
