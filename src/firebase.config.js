import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCnlRFFnROFk4f_gfQsBBwiYf8Z6w7DPFQ",
  authDomain: "avijitsamanta-class12.firebaseapp.com",
  projectId: "avijitsamanta-class12",
  storageBucket: "avijitsamanta-class12.appspot.com",
  messagingSenderId: "822484338282",
  appId: "1:822484338282:web:86d581e6f0bd049d5c2c13",
  measurementId: "G-4391EW9Y03",
};

const VAPID_KEY =
  "BEyPgydUrONHW7wdN8HB3pARGA643WaEBjKIlnJdtZD1K40SV-ePp1l4_6IxvE1yZYC1niG_Krq9NZbz_agGuFg";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export const getFMCToken = async () => {
  return await getToken(messaging, { vapidKey: VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken;
      } else {
        return;
      }
    })
    .catch((err) => {
      console.error("An error occurred while retrieving token. ", err);
    });
};

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // const { title, body } = payload.data;
  // showNotification(title, body, payload.data);
});
export const auth = getAuth(app);
export default app;
