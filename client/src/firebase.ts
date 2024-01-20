import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// firebase.initializeApp({
//   apiKey: "AIzaSyADbfN42BeX4wETbiosuMJ5WFrEbR5O7Q4",
//   authDomain: "fir-iot-4ab26.firebaseapp.com",
//   projectId: "fir-iot-4ab26",
//   storageBucket: "fir-iot-4ab26.appspot.com",
//   messagingSenderId: "45700071871",
//   appId: "1:45700071871:web:ef9b9746f9a666c674610a",
//   measurementId: "G-7T9NKED8C0",
// });

firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MEASUREMENT_ID,
});

export const firestore = firebase.firestore();

export type DocumentData = firebase.firestore.DocumentData;
