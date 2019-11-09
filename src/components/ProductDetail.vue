<template>
    <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      right
    >
      <v-list dense>
        <v-list-item>  
          <v-list-item-avatar>
             <v-img
              v-if="isUserLoggedIn && networkOnLine"
              class="user-picture can-hide"
              :src="user.photoURL"
              alt="Avatar"
            >
            </v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              Werner Kotze
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>


        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>


      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="white"
    >
        <v-btn icon
          to="/home"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>


<!--       <v-list-item-avatar>
          <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSpn1K0DuiJGSPnj3PQTFPk2SCsXK7B4K08YePvJ6GM9QVvt-gT"></v-img>
      </v-list-item-avatar>
      <v-toolbar-title>topnot</v-toolbar-title> -->
      <v-spacer />
      <v-toolbar-items>
        <!-- <v-btn text>Register</v-btn> -->
        <v-btn text>Sign In</v-btn>
      </v-toolbar-items>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
  </v-app>
<!--   <div class="product-detail">
    <h1>{{ product.name }}</h1>
  </div> -->
</template>

<script>
import firebase from 'firebase/app'
import { mapGetters, mapState } from 'vuex'

export default {
  props: {
    product: Object,
    source: String
  },
  data: () => ({
    drawer: null,
  }),
  computed: {
    ...mapGetters('authentication', ['isUserLoggedIn']),
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine', 'appTitle', 'appShortTitle']),
    menuItems () {
      let menuItems = [
        {icon: 'mdi-scissors-cutting', title: 'Hairdressers', link: '/home'}
      ]
      if (this.isUserLoggedIn) {
        menuItems = [
          {icon: 'mdi-scissors-cutting', title: 'Hairdressers', link: '/home'},
          {icon: 'mdi-heart-circle-outline', title: 'Favorites', link: '/favorites'},
          {icon: 'mdi-account-circle-outline', title: 'Profile', link: '/profile'},
          {icon: 'mdi-help-circle-outline', title: 'Help', link: '/help'}
        ]
      }
      return menuItems;
    },
  },
  methods: {
    async logout() {
      await firebase.auth().signOut()
    }
  }
}; 
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.product-detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
