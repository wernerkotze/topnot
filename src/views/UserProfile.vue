<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-row justify-center>
         <v-flex>
              <v-container
                fluid
              >
                <v-row justify="center">
                  <v-col cols="12" sm="10" md="8" lg="6">
                    <v-card>
                      <v-snackbar
                        v-model="snackbar"
                        absolute
                        top
                        right
                        color="success"
                      >
                        <span>Registration successful!</span>
                        <v-icon dark>mdi-checkbox-marked-circle</v-icon>
                      </v-snackbar>
                      <v-form ref="form" @submit.prevent="submit">
                        <v-container fluid>
                          <v-row>
                            <v-col cols="12" sm="6">
                              <v-text-field
                                v-model="form.first"
                                :rules="rules.name"
                                color="purple darken-2"
                                label="First name"
                                required
                                filled
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-text-field
                                v-model="form.last"
                                :rules="rules.name"
                                color="blue darken-2"
                                label="Last name"
                                required
                                filled
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-textarea
                                v-model="form.bio"
                                color="teal"
                                filled
                              >
                                <template v-slot:label>
                                  <div>
                                    Bio <small>(optional)</small>
                                  </div>
                                </template>
                              </v-textarea>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-select
                                v-model="form.favoriteAnimal"
                                :items="animals"
                                :rules="rules.animal"
                                color="pink"
                                label="Favorite animal"
                                required
                                filled
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-slider
                                v-model="form.age"
                                :rules="rules.age"
                                color="orange"
                                label="Age"
                                hint="Be honest"
                                min="1"
                                max="100"
                                thumb-label
                              ></v-slider>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <gmap-autocomplete
                                @place_changed="setPlace"
                                class="geosuggest-input"
                                :class="`elevation-${3}`" 
                                placeholder="Enter address"
                              >
                              </gmap-autocomplete>
                            </v-col>
                            <v-col cols="12">
                              <v-checkbox
                                v-model="form.terms"
                                color="green"
                              >
                                <template v-slot:label>
                                  <div @click.stop="">
                                    Do you accept the
                                    <a href="javascript:;" @click.stop="terms = true">terms</a>
                                    and
                                    <a href="javascript:;" @click.stop="conditions = true">conditions?</a>
                                  </div>
                                </template>
                              </v-checkbox>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-card-actions>
                          <v-btn text @click="resetForm">Cancel</v-btn>
                          <v-spacer></v-spacer>
                          <v-btn
                            :disabled="!formIsValid"
                            text
                            color="primary"
                            type="submit"
                          >Register</v-btn>
                        </v-card-actions>
                      </v-form>
                      <v-dialog v-model="terms" width="70%">
                        <v-card>
                          <v-card-title class="title">Terms</v-card-title>
                          <v-card-text v-for="n in 5" :key="n">
                            {{ content }}
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="purple"
                              @click="terms = false"
                            >Ok</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <v-dialog v-model="conditions" width="70%">
                        <v-card>
                          <v-card-title class="title">Conditions</v-card-title>
                          <v-card-text v-for="n in 5" :key="n">
                            {{ content }}
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="purple"
                              @click="conditions = false"
                            >Ok</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
        </v-flex>
       </v-row>
      </v-container>
        <div style="display: none">
          <gmap-map ref="mainmap"
            :center="position"
            :options="mapOptions"
            map-type-id="terrain"
            style="width: 100vw; height: 92vh"
          ></gmap-map>
        </div>
    </v-content>
    <v-footer color="indigo" app>
    </v-footer>
  </v-app>
</template>
<script>
  
  /* global google */

  export default {
    data () {
      const defaultForm = {
        first: '',
        last: '',
        bio: '',
        favoriteAnimal: '',
        age: null,
        terms: false,
      }

      return {
        form: defaultForm,
        rules: {
          age: [
            val => val < 10 || `I don't believe you!`,
          ],
          animal: [val => (val || '').length > 0 || 'This field is required'],
          name: [val => (val || '').length > 0 || 'This field is required'],
        },
        animals: ['Dog', 'Cat', 'Rabbit', 'Turtle', 'Snake'],
        conditions: false,
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.`,
        snackbar: false,
        terms: false,
        defaultForm,
        position: {lat: 0.0, lng: 0.0},
        radius: 800,
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
        error: {
          status: false,
          message: ''
        },
        searching: false
      }
    },

    computed: {
      formIsValid () {
        return (
          this.form.first &&
          this.form.last &&
          this.form.favoriteAnimal &&
          this.form.terms
        )
      },
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
      resetForm () {
        this.form = this.defaultForm;
        this.$refs.form.reset()
      },
      submit () {
        this.snackbar = true
        this.resetForm()
      },
      setPlace (place) {
        this.position.lat = place.geometry.location.lat();
        this.position.lng = place.geometry.location.lng();
        this.find();
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

        // Get place list
        service.nearbySearch(request, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {

            // store
            vm.$store.commit('maps/updateResult',results);
            console.log(results);
            // route
            // vm.$router.push(`/userfeed/${vm.position.lat}/${vm.position.lng}/${vm.zoom}/`);

          } else {
            vm.searching = false;
            vm.error.message = 'Sad, nothing found :(';
            vm.error.status = true;
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

</style>
