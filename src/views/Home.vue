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
                  <v-text-field
                    append-icon="mdi-map-search-outline"
                    solo-inverted
                    width="100%"
                    placeholder="Entere delivery address"
                  ></v-text-field>
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
  head() {
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
      ]
    }
  },
  computed: mapState('app', ['appTitle'])
};
</script>

<style lang="scss" scoped>

</style>
