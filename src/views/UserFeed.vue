<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-row justify-center>
         <v-flex>
              <v-container
                fluid
              >
                <v-row column class="max-view" v-if="resultList && randi != -1">
                  <gmap-map ref="resultmap"
                    :center="resultList[randi].geometry.location"
                    :zoom="zoom"
                    :options="mapOptions"
                    map-type-id="terrain"
                    style="width: 100vw; height: 30vh"
                  >
                    <gmap-marker :position="resultList[randi].geometry.location"></gmap-marker>
                    <gmap-marker :position="position" icon="/static/img/streetview-icon.png"></gmap-marker>
                  </gmap-map>

                  <v-row column class="text" v-if="resultList.length > 1">
                    <img class="place-img" :src="resultList[randi].photos && resultList[randi].photos[0] ? resultList[randi].photos[0].getUrl({'maxWidth': 256, 'maxHeight': 256}) : '/static/img/default_place.png'" alt="">
                    <h3 class="teal--text lighten-2">{{resultList[randi].name}}</h3>
                    <star-rating class="start-rating" :rating="resultList[randi].rating" :read-only="true" :star-size="20" :show-rating="false"></star-rating>
                    <h5>{{resultList[randi].vicinity}}</h5>
                  </v-row>

                  <v-row column class="text" v-else>
                    <h1 class="teal--text lighten-2">; - ;</h1>
                    <h3 class="teal--text lighten-2">Nothing left to eat</h3>
                    <h5>เรื่องมากชิบหาย</h5>
                  </v-row>

                  <v-row column class="btn-container">
                    <v-btn round primary dark @click="random" class="pink lighten-2" :disabled="resultList.length <= 1">Re-random</v-btn>
                    <v-btn round dark @click="back" class="blue-grey lighten-1">Back</v-btn>
                  </v-row>

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
import { mapGetters } from 'vuex'

  export default {
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
      resultList: function() {
        return this.$store.state.resultList;
      },
    },
    mounted () {
      if(this.resultList.length == 0) {
          this.back();
      }

      //Init data
      this.position = {lat: Number(this.$route.params.lat), lng: Number(this.$route.params.lng)};
      this.zoom = Number(this.$route.params.zoom);

      this.random();
    }
    methods: {
      random: function() {
          if(this.randi > 0) {
            //remove old random
            this.resultList.splice(this.randi,1);
            this.$store.commit('updateResult',this.resultList);
          }

          this.randi = Math.floor(Math.random() * this.resultList.length);
        },
        back: function() {
          this.$router.push('/');
        }
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
