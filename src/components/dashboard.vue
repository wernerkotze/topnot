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
                              <span class="headline white--text">{{ hairdresser.firstname }} {{ hairdresser.lastname }}</span><br>
                              <span class="white--text">{{ hairdresser.companyName }}</span></br>
                              <span class="white--text">{{ hairdresser.companyAddr }}</span>
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
                              <span class="headline white--text">{{ item.name }}</span><br>
                              <span class="white--text">{{ item.companyAddr }}</span></br>
                              <span class="white--text">{{ item.hours }}</span>
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
    <div class="google-map" :id="mapName" hidden></div>
    <v-footer color="indigo" app>
    </v-footer>
  </v-app>
</template>

<script>
  var x ;
  var service;//google stuff
  var shoppingItems; 
  var map;//google stuff
  var infowindow;//google stuff
  var radius = 5000;

  //Dummy value is replaced by all Nearby hairdressers
  var nearbyHairdressersOG = [] ;

  //Dummy values that is replaced by places that Google Nearby Search returned
  var shoppingItemsOG= [
    {
        name: 'Chop Shop',
        lat: '10',
        long: '10',
        companyAddr : 'address',
        hours : 'open'
    },
    {
        name: 'Partners',
        lat: '12',
        long: '10',
        companyAddr : 'address',
        hours : 'open'
    }];

  /*
     callback
     results : places returned from google API
     It populates the nearbyHairdressers if the corresponding hairdresser
     ( that is returned by Google API) is present in our DB
     It also calls createMarker for each place in results
     */
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            //empty both arrays before populating
            shoppingItemsOG.length = 0;
            nearbyHairdressersOG.length = 0;
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                if (x != null) { //if x is not empty
                    for (var j = 0; j < x.length; j++) {
                        //checks if place ( google place) matches x ( heairdresser form DB) by name
                        if(x[j].companyName == place.name){
                            nearbyHairdressersOG.push({
                                firstname: x[j].firstname,
                                lastname: x[j].lastname,
                                companyName: x[j].companyName,
                                companyAddr: x[j].companyAddr,
                                companyLat: x[j].companyLat,
                                companyLong: x[j].companyLong,
                                hashtags: x[j].hashtags,
                                age: x[j].age
                            });
                        }
                    }
                }
                createMarker(results[i]);
            }
        }
    }
    
    /*
    arePointsNear
    This function takes 2 sets of coordinates and a radius
    It computes whether the points are inside the radius
    Is called in methods
    */
    function arePointsNear(checkPoint, centerPoint, km) {
        var ky = 40000 / 360;
        var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
        var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
        var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
        return Math.sqrt(dx * dx + dy * dy) <= km;
    }

    /*
    createMarker
    place : a single place from google api
    It creates a marker to be placed on the map.
    It also populates shoppingItems ..... shopping itmes is used to store and display
    the places google's api returns....testing purposes
    */
    function createMarker(place) {
        var placeLoc = place.geometry.location;

        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });

        shoppingItemsOG.push({  
            name: place.name,
            lat: place.geometry.location.lat(),
            long: place.geometry.location.lng(),
            companyAddr:place.vicinity,
            hours : place.opening_hours
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }

  import navbar from '@/components/navbar.vue'

  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  import { mapState } from 'vuex'
    
  export default {

    name:'dashboard',

    props: {
      name: 'name'
    },

    data: function() {
      return {
        drawer: null,
        mapName: this.name + "-map",
        markerCoordinates: [{
          latitude: 51.501527,
          longitude: -0.1921837
        }],
        /*
        Variable to store all nearby hairdresser ( places that is both in our
        DB as well as returned in the nearby places search)
        */
        nearbyHairdressers :nearbyHairdressersOG,
        shoppingItems: shoppingItemsOG,//All the places that Google Nearby Search returned
        hairdessers: [],//Supposed to be all the hairdresssers in our DB... but only works sometimes
      }
    },

    components: {
      navbar
    },

    methods:{
      LocateNearby: function() {
        this.$store.dispatch('loadHairdressers');
        x = this.$store.getters.loadedHairdressers;

        let place = this.$store.getters.address;

        //Sets variable of the users selected loaction
        // this.lat = this.$store.getters.lat;
        // this.long = this.$store.getters.long;
        this.markerCoordinates.latitude = this.lat;
        this.markerCoordinates.longitude = this.long;
        

        //Map Things
        var latLong =  new google.maps.LatLng(this.markerCoordinates.latitude,this.markerCoordinates.longitude)
        const element = document.getElementById(this.mapName)

        const options = {
            zoom: 14,
            center: latLong
        }

        //map is created
        map = new google.maps.Map(element, options);

        //request used to search for all nearby hairdresser
        var request = {
            location: latLong,
            radius: radius,
            type: ['hair_care']
        };

        infowindow = new google.maps.InfoWindow();

        service = new google.maps.places.PlacesService(map);
        //Call to API to return nearby hairdressers
        service.nearbySearch(request, callback);
        //Sets the map visible
        //document.getElementById('cardsAndMap').style.visibility = 'visible';
        
      }
    },

    computed: {
      ...mapGetters([
          'address',
          'long',
          'lat',
          'loadedHairdressers'
      ]),
      // ...mapState([
      //   'address',
      //   'long',
      //   'lat'
      // ]),
      //  Is supposed to call loadedHairDresser in users.js and return the
      // list of hairdressers in the DB

      // Something is wrong regarding the timing of this. It is sometimes called
      // too late and the x variable is empty when x is called in a function above.

      // EDIT : This method does not have to be here. I added this to mounted under
      // the .autocomplete.addListener and it seems to work.
      
      hairdressers () {
          return x = this.$store.getters.loadedHairdressers;
      },

      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined;
      }

    },
    mounted:  function() {
      //Calls loadedHairdressers directly...also unsrue about the placing of this
      //this.$store.dispatch('loadHairdressers');
      this.LocateNearby();
      
      
    } 

  };
</script>

<style lang="scss" scoped>
  h1 {
    text-align: center;
  }
</style>
