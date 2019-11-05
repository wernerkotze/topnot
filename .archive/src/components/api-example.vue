<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
    <v-toolbar flat class="transparent">
       <v-list class="pa-0">
         <v-list-tile avatar>
           <v-list-tile-avatar>
             <img src="https://randomuser.me/api/portraits/men/85.jpg">
           </v-list-tile-avatar>

           <v-list-tile-content>
             <v-list-tile-title>Werner</v-list-tile-title>
           </v-list-tile-content>
         </v-list-tile>
       </v-list>
      </v-toolbar>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>question_answer</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>FAQ</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>lock</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
    </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"><v-icon>menu</v-icon></v-toolbar-side-icon>
      <v-toolbar-title>topnot</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
       <v-layout align-center justify-center>
         <v-flex xs12 sm8 md4>
           <v-card class="elevation-12">
             <v-toolbar dark color="indigo">
               <v-toolbar-title>Login form</v-toolbar-title>
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
               <v-form @submit.prevent="postLogin($data)">
                 <v-text-field v-model="email" prepend-icon="person" name="login" label="Login" type="email"></v-text-field>
                 <v-text-field v-model="password" prepend-icon="lock" name="password" label="Password" id="password" type="password" required></v-text-field>
                 <v-card-actions>
                   <v-spacer></v-spacer>
                   <v-btn type ='submit' color="primary">Login</v-btn>
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

export default {
  data: () => ({
    drawer: null,
    email: '',
    password: ''
  }),
  props: {
    source: String
  },
  methods: {
    ...mapActions({
      postLogin: 'postLogin'
    })
  }
}
</script>

<style lang="scss" scoped>
  h1 {
    text-align: center;
  }
</style>
