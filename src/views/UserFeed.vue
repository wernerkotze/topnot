<template>
    <v-app id="inspire">
      <nav-bar></nav-bar>
       <user-list></user-list>
       <add-user v-if="networkOnLine"></add-user>
        <v-content>
            <v-container fluid>
                <v-row justify-center>
                    <v-flex>
                        <v-container
                            fluid
                        >
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
                                      class="mx-auto mb-4"
                                      v-for="result of resultList"
                                      :key="result.id"
                                    >
                                      <v-list-item>
                                        <v-list-item-avatar color="grey">
                                          
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                          <v-list-item-title class="headline">{{ result.name }}</v-list-item-title>
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
                    </v-flex>
                </v-row>
            </v-container>
        </v-content>
        <v-footer color="indigo" app>
        </v-footer>
    </v-app>
</template>

<script>
import { mapState } from 'vuex'
import UserList from '@/components/UserList'
import AddUser from '@/components/AddUser'
import NavBar from '@/components/NavBar' 
// import { mapGetters } from 'vuex'

  export default {
    components: { NavBar, UserList, AddUser},
    data () {
        return {
          position: {lat: 0.0, lng: 0.0},
          zoom: 15,
          randi: -1,
          mapOptions: {
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
          }
        }
    },
    computed: {
      resultList () {
        return this.$store.state.maps.resultList;
      },
      ...mapState('app', ['networkOnLine'])
      // ...mapState('products', ['products']),
    },
    mounted () {
      if(this.resultList.length === 0) {
          this.back();
      }

      // Init data
      this.position = {lat: Number(this.$route.params.lat), lng: Number(this.$route.params.lng)};
      this.zoom = Number(this.$route.params.zoom);

      this.random();
    },
    methods: {
      random () {
          if(this.randi > 0) {
            // remove old random
            this.resultList.splice(this.randi,1);
            this.$store.commit('maps/updateResult',this.resultList);
          }

          this.randi = Math.floor(Math.random() * this.resultList.length);
        },
        back () {
          this.$router.push('/');
        }
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
