<template>
  <div>
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
            <v-img
              v-if="!isUserLoggedIn"
              class="user-picture can-hide"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSpn1K0DuiJGSPnj3PQTFPk2SCsXK7B4K08YePvJ6GM9QVvt-gT"
              alt="Avatar"
            >
            </v-img>
          </v-list-item-avatar>
          <v-list-item-content
              v-if="isUserLoggedIn && networkOnLine"
          >
            <v-list-item-title>
              Werner Kotze
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-content
            v-if="!isUserLoggedIn"
          >
            <v-list-item-title>
              topnot
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
        <v-list-item link
          @click.once="logout"
          v-if="isUserLoggedIn && networkOnLine"
        >  
          <v-list-item-action>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Sign Out
            </v-list-item-title>
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
      <v-spacer />
      <v-toolbar-items>
        <v-btn text v-if="!isUserLoggedIn && !networkOnLine">Sign In</v-btn>
      </v-toolbar-items>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
  </div>
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
        {icon: 'mdi-scissors-cutting', title: 'Hairdressers', link: '/home'},
        {icon: 'mdi-key-outline', title: 'Register', link: '/login'},
        {icon: 'mdi-help-circle-outline', title: 'Help', link: '/help'},
        {icon: 'mdi-file-document-box-search-outline', title: 'Terms & Conditions', link: '/terms'}
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

.navbar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  right: 0;
  height: $navbar-height;
  background-color: $navbar-color;
  box-sizing: border-box;
  border-bottom: 1px solid #eaecef;
  padding: 0.7rem 1.5rem;
  line-height: 2.2rem;

  a {
    display: flex;
    align-items: center;
  }

  .title-desktop {
    display: inline;
  }

  .title-mobile {
    display: none;
  }

  @media (max-width: 500px) {
    padding: 0.7rem 0.7rem;

    .can-hide {
      display: none;
    }

    .title-desktop {
      display: none;
    }

    .title-mobile {
      display: block;
    }
  }

  .site-name {
    font-size: 1.3rem;
    font-weight: 600;
    color: #2c3e50;
    position: relative;
  }

  .logo {
    height: 24px;
    padding-right: 8px;
  }

  .links {
    padding-left: 1.5rem;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 0.9rem;
    position: absolute;
    right: 1.5rem;
    top: 0.7rem;
    display: flex;

    .nav-links {
      display: flex;
      align-items: center;
      justify-content: center;

      .nav-item {
        position: relative;
        display: inline-block;
        margin-left: 1.5rem;
        line-height: 2.2rem;

        &:first-child {
          margin-left: 0;
        }

        a {
          font-weight: 500;
          font-size: 0.9rem;
          text-decoration: none;
          color: $navbar-link-color;
          border-color: #2c3e50;
          line-height: 1.4rem;
          display: inline-block;
          cursor: pointer;
        }

        @mixin activatedLink() {
          margin-bottom: -2px;
          border-bottom: 2px solid $vue-color;
        }

        .router-link-active {
          @include activatedLink;
        }

        @media (hover) {
          :hover {
            @include activatedLink;
          }
        }
      }
    }
  }

  &.offline {
    background: $navbar-offline-color;
    .links .nav-links .nav-item a,
    .site-name {
      color: white;
    }
  }

  .user-picture {
    max-height: 32px;
    margin-left: 1.5rem;
    border-radius: 50%;
  }

  .offline-label {
    padding: 0px 10px;
    border: 1px solid white;
    border-radius: 5px;
    color: white;
    margin-left: 1.5rem;
  }
}
</style>
