import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBYRLFpxEu5Fs6-mOmTFOSbJhG75N9yiKU",
  authDomain: "fimple-768e8.firebaseapp.com",
  projectId: "fimple-768e8",
  storageBucket: "fimple-768e8.appspot.com",
  messagingSenderId: "717582333818",
  appId: "1:717582333818:web:2d7808961400907de788c3",
  measurementId: "G-PTV5PQ1GQ5"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);

export default fire;