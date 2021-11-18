// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
// import { initializeApp } from "@firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDbGwipyPAYZO1UOuJ3aNMqoXNQhOH7ODs",
    authDomain: "videoapp-af776.firebaseapp.com",
    projectId: "videoapp-af776",
    storageBucket: "videoapp-af776.appspot.com",
    messagingSenderId: "157700274090",
    appId: "1:157700274090:web:9585c8e1017d2d8d9a1dd3",
    measurementId: "G-WTVKGKB2TL"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider=new GoogleAuthProvider();