<template>
	<v-app id="inspire">
		<v-toolbar color="indigo" dark fixed app>
			<v-toolbar-title>topnot</v-toolbar-title>
		</v-toolbar>
		<v-content>
      <v-parallax
    height="300"
    src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
  ></v-parallax>

			<v-layout row justify-center>
      <v-flex xs6 sm4>
    <v-img
    height="300"
    width = "300"
      src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
    ></v-img>
  </v-flex>
				<v-dialog v-model="dialog" persistent max-width="600px">
					<v-btn slot="activator" color="primary" dark>Edit Profile</v-btn>
					<v-card>
						<v-form ref="form" @submit.prevent="onCreateHairdresser">
						<v-card-title>
							<span class="headline">User Profile</span>
						</v-card-title>

						<v-card-text>
							<v-container grid-list-md>

								<v-layout wrap>
									<v-flex xs12 sm6>
										<v-text-field
                       name="firstname"
                       label="First name"
                       v-model="firstname"
                       id="firstname"
                       color="purple darken-2"
                       required
                     ></v-text-field>
									</v-flex>
									<v-flex xs12 sm6>
										<v-text-field
                       name="lastname"
                       label="Last name"
                       v-model="lastname"
                       color="blue darken-2"
                       required
                     ></v-text-field>
									</v-flex>

									<v-flex xs12 >
										<v-slider
                       v-model="age"
                       color="orange"
                       label="Age"
                       hint="Be honest"
                       min="1"
                       max="100"
                       thumb-label
                     ></v-slider>
									</v-flex>
									<v-flex xs12>
										<div slot="label">
                       Chips
                     </div>
										<v-combobox
                  v-model="hashtags"
                  :items="hashtags"
                  label="Select your tags"
                  multiple
                  chips
                ></v-combobox>
									</v-flex>
									<v-flex xs12>
										<v-textarea
                       v-model="bio"
                       color="teal"
                     >
											<div slot="label">
                         Bio
												<small>(optional)</small>
											</div>
										</v-textarea>
									</v-flex>
									<v-flex xs12>
										<div >
                      <v-subheader class="pa-0">Business Address</v-subheader>
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
									</v-flex>
									<v-flex xs12>
                    <v-subheader class="pa-0">Company</v-subheader>
                     <v-autocomplete
                       v-model="companyName"
                       :items="shoppingItems"
                       prepend-icon="mdi-city"
                     >
                       <v-slide-x-reverse-transition
                         slot="append-outer"
                         mode="out-in"
                       >
                     </v-slide-x-reverse-transition>
                   </v-autocomplete>
									</v-flex>
								</v-layout>
							</v-container>
							<small>*indicates required field</small>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" flat @click="dialog = false">Change Password</v-btn>
							<v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
							<v-btn color="blue darken-1" flat @click="dialog = false" type="submit">Save</v-btn>
						</v-card-actions>
					</v-form>

					</v-card>
				</v-dialog>
			</v-layout>
			<v-card flat>

			</v-card>

			<div class="google-map" :id="mapName"></div>
		</v-content>
		<v-footer color="indigo" app></v-footer>
	</v-app>
</template>
<script>
  var service;//google stuff
  var map;//google stuff
  var infowindow;//google stuff
	var addrOG = '';//Array of company addresses
	var shoppingItems;//All the places returned by google nearby search
  var companyNameOG = [];//Array of company names
  var radius = 2000;
	//Dummy value that is populayed by all the places returned by nearby seqarch
  var shoppingItemsOG= [{
          name: 'Chop Shop',
          lat: '10',
          long: '10',
          companyAddr : 'address',
          hours : 'open'

      }];

			/*
		  callback
		  results : places returned from google API
		  It populates the shoppingItemsOG with the places returned by nearby search
		  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      shoppingItemsOG.length = 0;
      companyNameOG.length = 0;
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        companyNameOG.push(place.name);
        shoppingItemsOG.push({
	        name: place.name,
	        lat: place.geometry.location.lat(),
	        long: place.geometry.location.lng(),
	        companyAddr:place.vicinity,
	        hours : place.opening_hours
      }
        )
      }
    }
  }

import { mapGetters } from 'vuex'

export default {
    data () {
      return {
				companyName : '',
        mapName: this.name + "-map",
        dialog: false,
        hashtags: [
          'Programming',
          'Design',
          'Vue',
          'Vuetify'
        ],
        firstname: '',
        lastname: '',
        bio: '',
        age: '',
        imageUrl: 'g',
        long: '',
        lat: '',
        address:'',
				companyAddr:addrOG,
        shoppingItems: companyNameOG
      }
    },
    methods: {
      onCreateHairdresser () {
        console.log('hit action');
        const hairdresserData = {
          firstname: this.firstname,
          lastname: this.lastname,
          bio: this.bio,
          age: this.age,
          imageUrl: this.imageUrl,
					companyName:this.companyName,
	        companyAddr:addrOG,
					companyLat : this.lat,
					companyLong: this.long,
				  hashtags : this.hashtags
        }
        this.$store.dispatch('createHairdresserProfile', hairdresserData)
        this.$router.push('/dashboard')
      }
    },
    computed: {
      ...mapGetters([
        'user',
        'error',
        'loading'
      ])
    },
    mounted: function() {
        this.autocomplete = new google.maps.places.Autocomplete(
            (this.$refs.autocomplete), {
                types: ['geocode']
            }
        );
        this.autocomplete.addListener('place_changed', () => {
            let place = this.autocomplete.getPlace();//place selected
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

						addrOG = address;
            this.lat = place.geometry.location.lat();
            this.long = place.geometry.location.lng();
            // this.markerCoordinates.latitude = this.lat;
            // this.markerCoordinates.longitude = this.long;
            this.address = address;
            var latLong =  new google.maps.LatLng(this.lat,this.long);
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
             radius: 5000,
             type: ['hair_care']
           };

           infowindow = new google.maps.InfoWindow();
           service = new google.maps.places.PlacesService(map);
           service.nearbySearch(request, callback);//request made to API
      });

    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('profile')
        }
      }
    },
  }

</script>
<style lang="scss" scoped>
  h1 {
    text-align: center;
  }
</style>
