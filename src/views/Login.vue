<template>
  <div class="page-wrapper">
    <h1 class="login-page-title">Login page</h1>

    <!-- Loader -->
    <div v-show="user === undefined" data-test="loader">Authenticating...</div>

    <!-- Offline instruction -->
    <div v-show="!networkOnLine" data-test="offline-instruction">
      Please check your connection, login feature is not available offline.
    </div>

    <p v-if="loginError">{{ loginError }}</p>
    <!-- Auth UI -->
      <input
        v-model="email"
        type="email"
        class="login-input"
        required
        placeholder="Email"
      />
      <input
        v-model="password"
        type="password"
        class="login-input"
        required
        placeholder="Password"
      />
    <div
      v-show="user !== undefined && !user && networkOnLine"
      data-test="login-btn"
      class="login-btn"
      @click="login"
      @click="login('email')"
    >
        Login with email
      </div>
      <div
        v-show="user !== undefined && !user && networkOnLine"
        data-test="login-btn"
        class="login-btn"
        @click="login('google')"
      >
        Login with google
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { isNil } from 'lodash'
import firebase from 'firebase/app'
import { desktop as isDekstop } from 'is_js'

export default {
  data: () => ({ loginError: null, email: '', password: '' }),
  head() {
    return {
      title: {
        inner: 'Login'
      },
      meta: [
        {
          name: 'description',
          content: `Sign in or sign up to ${this.appTitle}`,
          id: 'desc'
        }
      ]
    }
  },
  computed: {
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine', 'appTitle'])
  },
  watch: {
    user: {
      handler(user) {
        if (!isNil(user)) {
          const redirectUrl = isNil(this.$route.query.redirectUrl)
            ? '/products'
            : this.$route.query.redirectUrl
          this.$router.push(redirectUrl)
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations('authentication', ['setUser']),
    async login(type) {
      this.loginError = null
      if (type === 'google') {
        const provider = new firebase.auth.GoogleAuthProvider()
        this.setUser(undefined)

        try {
          // Firebase signin with popup is faster than redirect
          // but we can't use it on mobile because it's not well supported
          // when app is running as standalone on ios & android
          isDekstop()
            ? await firebase.auth().signInWithPopup(provider)
            : await firebase.auth().signInWithRedirect(provider)
        } catch (err) {
            this.loginError = err
            this.setUser(null)
          } 
        } else if (type === 'email') {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .catch(function(error) {
            // Handle Errors here.
            this.loginError(error.message)
            // ...
          })
      }

    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.page-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .login-page-title {
    text-align: center;
  }

  .login-btn {
    margin-top: 20px;
    cursor: pointer;
    padding: 5px 20px;
    border: 1px solid;
    display: inline-block;
    border-radius: 3px;
    border-color: #2c3e50;

    &:hover {
      color: $vue-color;
      border-color: $vue-color;
    }

    .login-input {
      margin-top: 10px;
      padding-left: 5px;
      height: 30px;
      width: 225px;
      outline: none;
      font: inherit;
      border: 1px solid;
      border-color: #2c3e50;
      border-radius: 3px;
    }

  }
}
</style>
