<template>
  <v-app id="inspire">
    <v-toolbar color="indigo" dark fixed app>
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
             <v-toolbar dark color="indigo">
               <v-toolbar-title>Sign Up</v-toolbar-title>
             </v-toolbar>
             <v-card-text>
               <v-form @submit.prevent="onSignup($data)">
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
                 <v-text-field
                   v-model="confirmPassword"
                   prepend-icon="done"
                   name="confirmPassword"
                   label="Confirm Password"
                   id="confirmPassword"
                   type="password"
                   :rules="[comparePasswords]">
               </v-text-field>
                 <v-card-actions>
                   <v-spacer></v-spacer>
                   <v-btn type="submit" :disabled="loading" :loading="loading">
                    Sign up
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
    <v-footer color="indigo" app>
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
    password: '',
    confirmPassword: ''
  }),
  props: {
    source: String
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
    },
    ...mapGetters([
      'user',
      'error',
      'loading'
    ])
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('signin')
      }
    }
  },
  methods: {
    ...mapActions({
      onSignup: 'signUserUp',
      onDismissed: 'clearError'
    })
  }
}
</script>

<style lang="scss" scoped>
  h1 {
    text-align: center;
  }
</style>
