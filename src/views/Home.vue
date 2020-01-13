<template>
  <v-app>
    <v-app-bar
      app
      color="white"
    >
      <v-list-item-avatar>
          <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSpn1K0DuiJGSPnj3PQTFPk2SCsXK7B4K08YePvJ6GM9QVvt-gT"></v-img>
      </v-list-item-avatar>
      <v-toolbar-title>topnot</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <!-- <v-btn text>Register</v-btn> -->
        <v-btn text
          to="/login"
        >Sign In</v-btn>
      </v-toolbar-items>
    </v-app-bar>
      <v-content>
          <v-container
            fluid
          >
            <v-row
              align="center"
              justify="center"
            > 
              <v-col
                cols="12"
                sm="8"
                md="4"
              > 
                <div class="mx-4"> 
                  <gmap-autocomplete
                    @place_changed="setPlace"
                    class="geosuggest-input"
                    :class="`elevation-${3}`" 
                    placeholder="Enter address"
                  >
                  </gmap-autocomplete>
                </div>
                <div class="mx-4">
                  <v-btn
                      color="primary"
                      large
                      @click="find"
                      width="100%"
                    >
                      Find Hairdressers
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <div style="display: none">
              <gmap-map ref="mainmap"
                :center="position"
                :zoom="zoom"
                :options="mapOptions"
                map-type-id="terrain"
                style="width: 100vw; height: 92vh"
              ></gmap-map>
            </div>
            <v-img src="@/assets/img/topnot_explore.svg">
                <!-- MORE HERE -->
            </v-img>
          </v-container>
      </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

/* global google */

export default {

  data() {
    return {
      title: {
        inner: 'Home'
      },
      meta: [
        {
          name: 'description',
          content: `${this.appTitle} home page`,
          id: 'desc'
        }
      ],
      position: {lat: 0.0, lng: 0.0},
      radius: 1000,
      type: ['hair_care'],
      mapOptions: {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      },
      circleOptions: {
        strokeColor: '#FF0000',
        strokeOpacity: 0.6,
        strokeWeight: 1,
        fillColor: '#FF0000',
        fillOpacity: 0.2,
      },
      alltypes: [
        { name: 'Cafe', value: 'cafe', selected: false },
        { name: 'Bakery', value: 'bakery', selected: false },
        { name: 'Bar', value: 'bar', selected: false },
        { name: 'Convenience Store', value: 'convenience_store', selected: false },
        { name: 'Department Store', value: 'department_store', selected: false },
        { name: 'Restaurant', value: 'restaurant', selected: true }
      ],
      error: {
        status: false,
        message: ''
      },
      searching: false
    }
  },
  computed: {
    ...mapState('app', ['appTitle']),
    resultList () {
      return this.$store.state.maps.resultList;
    },
    // ...mapState('maps', ['resultList']),
    zoom () {
      return 15 - Math.round((this.radius-800)*0.002);
    }
  },
  watch: {
    place: {
      handler() {
        console.log('position changed!');
        localStorage.setItem('position', JSON.stringify(this.position));
      },
      deep: true,
    },
  },
  mounted() {
    const vm = this;

    this.searching = false;

    // Get device location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        vm.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      }, function() {
        console.log("Location Error")

        this.error.message = 'Sad, Location Error';
        this.error.status = true;
      });
    } else {
      console.log("Browser doesn't support Geolocation");
      this.error.message = 'Sad, Your browser doesn\'t support Geolocation';
      this.error.status = true;
    }
    console.log('App mounted!');
    if (localStorage.getItem('position')) this.position = JSON.parse(localStorage.getItem('position'));
  },
  methods: {
    setPlace (place) {
      this.position.lat = place.geometry.location.lat();
      this.position.lng = place.geometry.location.lng();
    },
    find() {
      // Init place service
      const request = {
        location: this.position,
        radius: this.radius,
        type: this.type
      };

      this.searching = true;

      const service = new google.maps.places.PlacesService(this.$refs.mainmap.$mapObject);

      const vm = this;

      const placesArr = [];

      // Get place list
      service.nearbySearch(request, function(results, status, pagination) {
        if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {

          results.forEach(function(result){
            placesArr.push(result);
          });

          // route
          vm.$router.push(`/userfeed/${vm.position.lat}/${vm.position.lng}/${vm.zoom}/`);

        } else {
          vm.searching = false;
          vm.error.message = 'Sad, nothing found :(';
          vm.error.status = true;
        }

        if (pagination.hasNextPage) {
          setTimeout(function(){ pagination.nextPage() }, 1000);
        } else {
          // store
          vm.$store.commit('maps/updateResult', placesArr);
          console.log(placesArr);
        }

      });
    }
  },
};
</script>

<style lang="scss" scoped>

.geosuggest-input {
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    border: 0;
    padding: 25px 10px;
    font-size: inherit;
    height: 62px;
    -moz-background-size: 16px;
    -o-background-size: 16px;
    -webkit-transition: all .2s linear;
    -o-transition: all .2s linear;
    -moz-transition: all .2s linear;
    transition: all .2s linear;
    text-align: center;
    margin-bottom: 10px;
    display: block;
    width: 100%;
    font-weight: 400;
    max-height: 32px;
}

  .layer-wrapper {
    position: relative;
  }

  .map-layer {
    position: absolute;
    height: 92vh;
  }

  .control-layer {
    position: relative;
    width: 100vw;
    height: 92vh;
  }

  .top-con {
    position: absolute;
    top: 0;
    width: 100vw;
    padding: 3vw 5vw;
  }

  .bottom-con {
    position: absolute;
    bottom: 0;
    width: 100vw;
    padding: 5vw;
  }

  .loading {
    width: 100vw;
    background-color: white;
    opacity: 0.6;
    z-index: 999;
    padding-top: 40vh;
  }

</style>
