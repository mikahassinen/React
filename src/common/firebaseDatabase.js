import firebase from 'firebase';
import axios from './axios';

const { log, } = console;
const config = {
  apiKey: 'AIzaSyCtZbXDyJb_xhovQ9XcRKTTcO-MA8asBuU',
  authDomain: 'reactcourse-83808.firebaseapp.com',
  databaseURL: 'https://reactcourse-83808.firebaseio.com',
  projectId: 'reactcourse-83808',
  storageBucket: '',
  messagingSenderId: '1054025612331',
};
firebase.initializeApp(config);
const dbRef = firebase.database().ref();
axios.get('/token').then(({ data: token, }) => {
  firebase.auth().signInWithCustomToken(token).catch((error) => {
    // Handle Errors here.
    const { code, message, } = error;
    log({ code, message, });
  });
});

export default dbRef;

exports.signOut =() => firebase.auth().signOut().then(() => {
  log('Signed Out');
}, (error) => {
  console.error('Sign Out Error', error);
});
