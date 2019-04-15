<template>
  <v-app id="inspire">
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-title>topnot</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
       <v-layout align-center justify-center>
         <v-flex xs12 sm8 md4>
           <v-layout row v-if="error">
               <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
           </v-layout>
           <v-card class="elevation-12">
             <v-toolbar dark color="primary">
               <v-toolbar-title>Login</v-toolbar-title>
               <v-spacer></v-spacer>
               <v-tooltip bottom>
                 <v-btn
                   icon
                   large
                   :href="source"
                   target="_blank"
                   slot="activator"
                 >
                   <v-icon large>code</v-icon>
                 </v-btn>
                 <span>Source</span>
               </v-tooltip>
             </v-toolbar>
             <v-card-text>
               <v-form  @submit.prevent="onSignIn($data)">
                 <v-text-field
                   v-model="email"
                   prepend-icon="person"
                   name="email"
                   label="Email"
                   type="email">
               </v-text-field>
                 <v-text-field
                   v-model="password"
                   prepend-icon="lock"
                   name="password"
                   label="Password"
                   id="password"
                   type="password"
                   required>
               </v-text-field>
                 <v-card-actions>
                   <v-spacer></v-spacer>
                   <v-btn type="submit" color="accent" :disabled="loading" :loading="loading">
                    Sign in
                     <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                     </span>
                  </v-btn>
                 </v-card-actions>
               </v-form>
             </v-card-text>
           </v-card>
         </v-flex>
       </v-layout>
     </v-container>
    </v-content>
    <v-footer color="primary" app>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    data: () => ({
      drawer: null,
      email: '',
      password: ''
    }),
    props: {
      source: String
    },
    computed: {
      ...mapGetters([
        'user',
        'error',
        'loading'
      ])
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('profile')
        }
      }
    },
    methods: {
      ...mapActions({
        onSignIn: 'signUserIn',
        onDismissed: 'clearError'
      })
    }
  }
</script>

<style>
</style>
