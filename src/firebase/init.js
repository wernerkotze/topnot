import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: 'AIzaSyBXEK2IakYa6zHX-bvvbIE7Ui6uG4qX5SM',
  authDomain: 'topnot-74d6f.firebaseapp.com',
  databaseURL: 'https://topnot-74d6f.firebaseio.com',
  projectId: 'topnot-74d6f',
  storageBucket: 'topnot-74d6f.appspot.com',
  messagingSenderId: '1014699130476',
  appId: '1:1014699130476:web:739dbd88865329a203a249'
}

firebase.initializeApp(config)
