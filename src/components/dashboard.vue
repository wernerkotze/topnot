<template>
  <v-app id="inspire">
    <navbar/>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
         <v-flex>
              <v-container
                fluid
                grid-list-sm
              >
                <v-layout row wrap>
                  <v-flex
                    v-for="hairdresser in nearbyHairdressers" 
                    :key="hairdresser.creatorId"
                  >
                    <v-card>
                      <v-img
                        src="http://wallpaperstock.net/the-beatles-minimalistic-illustration_wallpapers_43830_1600x1200.jpg"
                        height="200px"
                      >
                        <v-container
                          fill-height
                          fluid
                          pa-2
                        >
                          <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                              
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-img>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                          <v-icon>favorite</v-icon>
                        </v-btn>
                        <v-btn icon>
                          <v-icon>bookmark</v-icon>
                        </v-btn>
                        <v-btn icon>
                          <v-icon>share</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                  <v-flex
                    v-for="item in shoppingItems"
                  >
                    <v-card>
                      <v-img
                        src="https://cdn.shopify.com/s/files/1/0434/4749/files/Hazard_Haircut_1_grande.jpg?v=1528904232"
                        height="200px"
                      >
                        <v-container
                          fill-height
                          fluid
                          pa-2
                        >
                          <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>

                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-img>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                          <v-icon>favorite</v-icon>
                        </v-btn>
                        <v-btn icon>
                          <v-icon>bookmark</v-icon>
                        </v-btn>
                        <v-btn icon>
                          <v-icon>share</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
        </v-flex>
       </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
    </v-footer>
  </v-app>
</template>

<script>

  import navbar from '@/components/navbar.vue'

  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  import { mapState } from 'vuex'

  export default {
    data () {
        return {
            center: {
                lat: 48.853,
                lng: 2.298,
            },
            searchBounds: null,
            userPosition: null,
        }
    },
    computed: {
        nearbyRequest () {
            if (this.searchBounds) {
                return {
                    bounds: this.searchBounds,
                    type: 'hair_care'
                }
            }
        },
    },
    methods: {
        ...mapActions('layout', [
            'toggleSideNav',
        ]),
        centerOnUser () {
            if (this.userPosition) {
                this.center = this.userPosition
            }
        },
        onIdle (map) {
            this.searchBounds = map.getBounds()
            this.$refs.results.$el.scrollTop = 0
        },
        setUserPosition (position) {
            this.userPosition = position
        },
    },
    mounted() {
        console.log(this.$refs.results);
    }
};
    
  // export default {

  //   name:'dashboard',

  //   props: {
  //     name: 'name'
  //   },

  //   data: function() {
  //     return {
  //       drawer: null
  //     }
  //   },

  //   components: {
  //     navbar
  //   },

  //   methods:{


  //   },

  //   computed: {
  //     ...mapGetters([
  //         'address',
  //         'long',
  //         'lat',
  //         // 'loadedHairdressers'
  //     ]),
      
  //     // hairdressers () {
  //     //   return x = this.$store.getters.loadedHairdressers;
  //     // },

  //     userIsAuthenticated () {
  //       return this.$store.getters.user !== null && this.$store.getters.user !== undefined;
  //     }

  //   },

  //   mounted() {
  //     this.$store.dispatch('loadHairdressers');
  //   },

  // };

</script>
<style lang="scss" scoped>
  h1 {
    text-align: center;
  }
</style>
