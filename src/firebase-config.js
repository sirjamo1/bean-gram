// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBj50vx1rdFKw3kpqpu8Onyq1vjcrBajL4",
    authDomain: "bean-gram.firebaseapp.com",
    projectId: "bean-gram",
    storageBucket: "bean-gram.appspot.com",
    messagingSenderId: "566428331611",
    appId: "1:566428331611:web:a22825683150aef556597e",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
