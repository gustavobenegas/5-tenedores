import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyA0mKJkod3hBxJqAEHR3Rkh0WwRQAC9xsI",
    authDomain: "tenedores-a0cc2.firebaseapp.com",
    databaseURL: "https://tenedores-a0cc2.firebaseio.com",
    projectId: "tenedores-a0cc2",
    storageBucket: "tenedores-a0cc2.appspot.com",
    messagingSenderId: "697786466301",
    appId: "1:697786466301:web:a727920f44b48bbe8ae394"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig);