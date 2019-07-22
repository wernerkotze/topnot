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

              <googlemaps-map
                class="map"
                :center.sync="center"
                :zoom="12"
                @idle="onIdle"
                 v-if="this.lat && this.long"
              >
                <!-- User Position -->
                <googlemaps-user-position @update:position="setUserPosition" />
              </googlemaps-map>
              <!-- Places list -->
              <googlemaps-nearby-places
                  class="results-pane"
                  ref="results"
                  :request="nearbyRequest"
              >
                  <template slot-scope="props">
                    <v-layout row wrap>
                        <v-flex
                          v-for="result of props.results"
                          :key="result.id"
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
                                    <span class="headline white--text">{{ result.name }}</span><br>
                                    <span class="white--text">{{ result.vicinity }}</span></br>
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
                      <!-- <LoadingOverlay v-if="props.loading"/> -->
                  </template>
              </googlemaps-nearby-places>
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
            searchBounds: null,
            userPosition: null
        }
    },
    components: {
      navbar
    },
    computed: {
        ...mapGetters([
          'address',
          'long',
          'lat',
        ]),
        nearbyRequest () {
            if (this.searchBounds) {
                return {
                    bounds: this.searchBounds,
                    type: 'hair_care'
                }
            }
        },
        center() {
          return {
            lat: this.lat,
            lng: this.long
          }
        },
        matched() {

          let matched = [];

          this.$refs.results.forEach(factor => {

              grouped[factorgroupid]['items'].push({
                  'factornameid' : factor.factornameid,
                  'factorvalueid': factor.factorvalueid,
                  'factorname'   : factor.factorname,
                  'factorvalue'  : factor.factorvalue
              });

          });
          return mathes;
        }

    },

    methods: {
        onIdle (map) {
            this.searchBounds = map.getBounds()
            this.$refs.results.$el.scrollTop = 0
        },
        setUserPosition (position) {
            this.userPosition = position
        }

    },
    mounted () {
        console.log(this.$refs.results);
    }
};
    
</script>
<style lang="scss" scoped>
  h1 {
    text-align: center;
  }
  .demo {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .panes {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .map {
    flex: 1;
  }
  .results-pane {
    overflow-x: auto;
    overflow-y: auto;
    width: 400px;
    height: calc(100vh - 64px);
    position: relative;
    .photo {
        background: #eee;
    }
  }
</style>
