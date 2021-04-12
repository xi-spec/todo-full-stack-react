import firebase from 'firebase/app';
import firebaseConfig from './firebase.config';
import 'firebase/auth';

firebase.initializeApp(firebaseConfig);

firebase.auth();
