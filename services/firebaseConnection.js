import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyD9sEYiSh7gT7yrmN48rbU7mPArRixl5KQ",
    authDomain: "cyberfoxseparated.firebaseapp.com",
    projectId: "cyberfoxseparated",
    storageBucket: "cyberfoxseparated.appspot.com",
    messagingSenderId: "140736461912",
    appId: "1:140736461912:web:0fbc6f1e122e8ab3245e2d"
  };

  const app = initializeApp(firebaseConfig)
  export const auth = getAuth(app)