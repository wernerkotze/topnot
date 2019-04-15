<template>

    <v-card class="elevation-12">
        <v-card-text>
            <v-form  @submit.prevent="onLocate($data)" >
                <div >
                    <input
                       v-model="address"
                       ref="autocomplete"
                       placeholder=" Enter your location"
                       class="search-location"
                       onfocus="value = ''"
                       type="text"
                       label = 'address'
                       />
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" color="accent" >Locate
                        <span slot="loader" class="custom-loader">
                            <v-icon light>cached</v-icon>
                        </span>
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
            
            
            <!--
             Display all Nearby hairdresser that is in our DB
            -->
            <!-- <section>
                <v-layout row wrap v-for="hairdresser in nearbyHairdressers" :key="hairdresser.creatorId" class="mb-2">
                  <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                    <v-card class="info">
                      <v-container fluid>
                        <v-layout row>
                          <v-flex xs7 sm8 md9>
                            <v-card-title primary-title>
                              <div>
                                <h5 class="white--text mb-0">{{ hairdresser.firstname }}</h5>
                                    <h5 class="white--text mb-0">{{ hairdresser.lastname }}</h5>
                                    <h3 class="white--text mb-0">{{ hairdresser.companyName }}</h3>
                                    <h3 class="white--text mb-0">{{ hairdresser.companyAddr }}</h3>
                                    <h5 class="white--text mb-0">{{ hairdresser.companyLat }}</h5>
                                    <h5 class="white--text mb-0">{{ hairdresser.companyLong }}</h5>
                                    <h5 class="white--text mb-2">{{ hairdresser.hashtags }}</h5>
                                    <h5 class="white--text mb-0">{{ hairdresser.age }}</h5>
                                    <h5 class="white--text mb-2">{{ lat }}</h5>
                              </div>
                            </v-card-title>
                            <v-card-actions>
                            </v-card-actions>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </v-flex>
                </v-layout>
            </section> -->


            <!--
             Display all hair_care places returned by google api
            -->
<!--                 <div id = 'cardsAndMap' style="visibility: hidden">
                    <v-flex xs12  offset v-for="item in shoppingItems">
                        <br/>
                        <v-card >
                            <v-card-title primary-title >
                                <div >
                                  <h3 > {{ item.name }} </h3>
                                  <h5> {{ item.lat }} </h5>
                                  <h5> {{ item.long }} </h5>
                                  <h5> {{ item.companyAddr }} </h5>
                                  <h5> {{ item.hours }} </h5>
                                </div>
                            </v-card-title>
                            <v-card-actions>
                                <v-btn flat color="orange">Hallor At Me</v-btn>
                                <v-btn flat color="orange">Scope Location</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <div class="google-map" :id="mapName"></div>
              </div> -->
        
    
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

    import { mapActions } from 'vuex'
    import { mapGetters } from 'vuex'

export default {

    name: 'addressautocomplete',

    props: ['name'],

    data: function() {
        return {
            title: 'topnot',
            mapName: this.name + "-map",
            markerCoordinates: [{
              latitude: 51.501527,
              longitude: -0.1921837
            }],
            address: '',//of the current user
            long: '',// of the current user
            lat: '',//of the current user
            /*
            Variable to store all nearby hairdresser ( places that is both in our
            DB as well as returned in the nearby places search)
            */
            nearbyHairdressers :nearbyHairdressersOG,
            shoppingItems: shoppingItemsOG,//All the places that Google Nearby Search returned
            hairdessers: [],//Supposed to be all the hairdresssers in our DB... but only works sometimes
        }
    },

    computed: {
        // ...mapGetters([
        //     'address'
        // ]),
        /* Is supposed to call loadedHairDresser in users.js and return the
        list of hairdressers in the DB

        Something is wrong regarding the timing of this. It is sometimes called
        too late and the x variable is empty when x is called in a function above.

        EDIT : This method does not have to be here. I added this to mounted under
        the .autocomplete.addListener and it seems to work.
        */
        hairdressers () {
            return x = this.$store.getters.loadedHairdressers;
        }
    },

    methods: {
        ...mapActions({
            onLocate: 'locate'
        })
    },

    mounted: function() {

        //Calls loadedHairdressers directly...also unsrue about the placing of this
        this.$store.dispatch('loadHairdressers');

        //API call to allow autocompletion
        this.autocomplete = new google.maps.places.Autocomplete(
            (this.$refs.autocomplete), {
                types: ['geocode']
            }
        );

        /*
        Allows to select a place that is returned by autocomplete. Get the address/lat/long
        of the selected location. It calls callBack() as well as creates/up[dates] the map.
        it is also used to return all nearby hairdressers
        */
       
        this.autocomplete.addListener('place_changed', () => {

            x = this.$store.getters.loadedHairdressers;

            //place selected
            let place = this.autocomplete.getPlace();
            let ac = place.address_components;
            var address = ' ';

            //The address of the selected location is formatted into a more
            // readable format
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].long_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }

            //Sets variable of the users selected loaction
            this.lat = place.geometry.location.lat();
            this.long = place.geometry.location.lng();
            this.markerCoordinates.latitude = this.lat;
            this.markerCoordinates.longitude = this.long;
            this.address = address;

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
           document.getElementById('cardsAndMap').style.visibility = 'visible';
        });
    }
};

</script>

<style lang="scss">

.google-map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background: gray;}

*, *::after, *::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

.search-location {
  display: block;
  width: 60vw;
  margin: 0 auto;
  margin-top: 5vw;
  font-size: 20px;
  font-weight: 400;
  outline: none;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 10px;
}
</style>
