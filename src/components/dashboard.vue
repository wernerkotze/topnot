<template>
  <v-app id="inspire">
    <navbar/>
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
         <v-flex xs12 sm6 offset-sm3>
           <v-card>
             <v-img
               src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
               aspect-ratio="2.75"
             ></v-img>

             <v-card-title primary-title>
               <div>
                 <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                 <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
               </div>
             </v-card-title>

             <v-card-actions>
               <v-btn flat color="orange">Share</v-btn>
               <v-btn flat color="orange">Explore</v-btn>
             </v-card-actions>
           </v-card>
         </v-flex>
       </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
    </v-footer>
  </v-app>
</template>

<script>

  import navbar from '@/components/navbar.vue'
    
  export default {

    data: () => ({

      drawer: null

    }),

    components: {
      navbar
    },

    computed: {

      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined;
      }

    }

  };
</script>

<style lang="scss" scoped>
  h1 {
    text-align: center;
  }
</style>
