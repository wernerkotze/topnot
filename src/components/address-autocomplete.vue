<template>
    <v-card class="elevation-12">
        <v-card-text>
            <v-form  @submit.prevent="onLocate($data)" >
                <div >
                    <input
                       ref="autocomplete"
                       placeholder=" Enter your location"
                       class="search-location"
                       onfocus="value = ''"
                       type="text"
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
</template>


<script>

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
            address: '',
            long: '',
            lat: '',
        }
    },
    
    methods: {
        ...mapActions({
            onLocate: 'locate'
        })
    },

    mounted: function() {

        // API call to allow autocompletion
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

            //place selected
            let place = this.autocomplete.getPlace();
            let ac = place.address_components;
            var address = '';

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
