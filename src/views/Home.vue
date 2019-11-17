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
<!--                   <v-text-field
                    append-icon="mdi-map-search-outline"
                    solo-inverted
                    width="100%"
                    placeholder="Entere delivery address"
                  ></v-text-field> -->
                </div>
                <div class="mx-4">
                  <v-btn
                      color="primary"
                      large
                      href="/products"
                      width="100%"
                    >
                      Find Hairdressers
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <div class="col-md-8">
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
      center: {lat: 34.503441, lng: -82.650131},
      place: null
    }
  },
  methods: {
    setPlace (place) {
      this.center = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      this.place = place
      console.log(place);
    }
  },
  watch: {
    place: {
      handler() {
        console.log('place changed!');
        localStorage.setItem('place', JSON.stringify(this.place));
      },
      deep: true,
    },
  },
  computed: mapState('app', ['appTitle']),
  mounted() {
    console.log('App mounted!');
    if (localStorage.getItem('place')) this.place = JSON.parse(localStorage.getItem('place'));
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
