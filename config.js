import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig={
  apiKey: "AIzaSyD9B3-fjgL3E_7v69Ut2HyRuA5kc0fw1dE",
  authDomain: "tdoredux-fff3a.firebaseapp.com",
  projectId: "tdoredux-fff3a",
  storageBucket: "tdoredux-fff3a.appspot.com",
  messagingSenderId: "246779048098",
  appId: "1:246779048098:web:2ac551c8db8320d51fe7fb",
  measurementId: "G-KERYRX3NNH"
};
if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
export {firebase};