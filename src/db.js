import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import config from './config/firebase-config.js';

const db = firebase.initializeApp(config.firebaseConfig);

const firestore = db.firestore();

export default firestore;
