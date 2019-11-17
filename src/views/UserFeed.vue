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
      <v-spacer />
      <v-toolbar-items>
        <v-btn text>Sign In</v-btn>
      </v-toolbar-items>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-row
              align="center"
              justify="center"
              class="grey lighten-5"
              style="height: 300px;"
            >
              <v-card
                max-width="344"
                class="mx-auto"
              >
                <v-list-item>
                  <v-list-item-avatar color="grey"></v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
                    <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <!-- 
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                  height="194"
                ></v-img> -->

                <v-card-text>
                  Visit ten places on our planet that are undergoing the biggest changes today.
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    text
                    color="deep-purple accent-4"
                  >
                    Read
                  </v-btn>
                  <v-btn
                    text
                    color="deep-purple accent-4"
                  >
                    Bookmark
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-share-variant</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

  </v-app>
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
    dense: false,
    searchBounds: 500,
    userPosition: null,
    places: [],
    matches: []
  }),
  computed: {
    ...mapGetters('authentication', ['isUserLoggedIn']),
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine', 'appTitle', 'appShortTitle']),
    nearbyRequest() {
        if (this.searchBounds) {
            return {
                bounds: this.searchBounds,
                type: 'hair_care'
            }
        } 
        return {};
    },
    center() {
      return {
        lat: this.lat,
        lng: this.long
      }
    },
    // matched() {
    //   let matched = [];
    //   this.places.forEach(place => {
    //     // matched.push({
    //     //     'name' : result.factornameid,
    //     // });
    //   });
    //   return matched;
    // },
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
    },
    onIdle (map) {
        this.searchBounds = map.getBounds()
        this.$refs.results.$el.scrollTop = 0
    },
    setUserPosition (position) {
        this.userPosition = position
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





<!-- <template>


  <v-card
    max-width="344"
    class="mx-auto"
  >
    <v-list-item>
      <v-list-item-avatar color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
        <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
      height="194"
    ></v-img>

    <v-card-text>
      Visit ten places on our planet that are undergoing the biggest changes today.
    </v-card-text>

    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Read
      </v-btn>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Bookmark
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
 -->
