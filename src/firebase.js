import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCBYr970X9-wyvgkBTUOXkV2XRIvyYF9ao",
  authDomain: "video-e795c.firebaseapp.com",
  projectId: "video-e795c",
  storageBucket: "video-e795c.appspot.com",
  messagingSenderId: "636466290959",
  appId: "1:636466290959:web:fb947720af92520437de7a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app;  