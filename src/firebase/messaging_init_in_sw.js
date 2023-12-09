import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyA1soMDIMI5JErEfd-t1TqXO4_JtnthxL4",
    authDomain: "capstone-project-edcc0.firebaseapp.com",
    databaseURL: "https://capstone-project-edcc0-default-rtdb.firebaseio.com",
    projectId: "capstone-project-edcc0",
    storageBucket: "capstone-project-edcc0.appspot.com",
    messagingSenderId: "732517943590",
    appId: "1:732517943590:web:d4b9ae6a3b344ce14059e7",
    measurementId: "G-SCBHF3T9ZZ"
  };

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

export function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");

      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey: "YOUR_VAPID_KEY",
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("CurrentToken: ", currentToken);
          } else {
            console.log("Can not get token");
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });
    } else {
      console.log("Do not have permission!");
    }
  });
}

export async function getAllUser() {
  const data = [];
  const querySnapshot = await getDocs(collection(database, 'admin/ADMIN1/user'));
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}




