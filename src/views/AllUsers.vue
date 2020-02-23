<template>
  <v-app>
    <nav-bar></nav-bar>
    <div class="mt-4">
      <h1 class="products-page-title">All Users page</h1>
      <user-list class="user-list"></user-list>
      <add-user v-if="networkOnLine"></add-user>
    </div>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import UserList from '@/components/UserList'
import AddUser from '@/components/AddUser'
import NavBar from '@/components/NavBar'

export default {
  components: { NavBar, UserList, AddUser },
  computed: mapState('app', ['networkOnLine'])
};
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.products-page-title {
  text-align: center;
  margin-bottom: 60px;
}

.product-list {
  margin: 20px 0;
}
</style>
