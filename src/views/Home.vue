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
        <v-btn text>Sign In</v-btn>
      </v-toolbar-items>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
    </v-app-bar>
<!--     <v-img src="@/assets/img/topnot_air.svg"
      aspect-ratio="1"
      class="grey lighten-2"
      max-height="300"
    > -->

    <!-- </v-img> -->
   
      <section class="mt-4">
        <v-img src="@/assets/img/topnot_explore.svg">
          <v-layout
            column
            align-center
            justify-center
            class="mt-12"
            
          >
            <!-- <h1 class="mb-2 display-1 text-left">never get another bad haircut again...</h1> -->
            <v-text-field
              background-color="secondary"
              append-icon="mdi-map-search-outline"
              class="mx-4"
              light
              solo-inverted
              placeholder="Start typing"
            ></v-text-field>
            <v-btn
              color="primary"
              large
              href="/products"
            >
              Find Hairdressers
            </v-btn>
          </v-layout>
        </v-img>
      </section>
    <v-footer
      color="white"
      app
    >
      

      <!-- <span class="black--text"> &copy; Top Company</span> -->
    </v-footer>
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
@import '@/theme/variables.scss';

// .page-wrapper {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;

//   .logo {
//     margin-bottom: 3rem;
//   }

//   .home-page-title {
//     text-align: center;
//   }

//   .documentation-link {
//     display: inline-block;
//     font-size: 1.2rem;
//     color: #fff;
//     background-color: #5d6788;
//     padding: 0.8rem 1.6rem;
//     border-radius: 4px;
//     transition: background-color 0.1s ease;
//     box-sizing: border-box;
//     text-decoration: none;
//     width: fit-content;
//     font-weight: 500;
//   }
// }
</style>
