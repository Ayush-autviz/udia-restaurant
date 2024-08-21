import Firebase from "firebase";
 
// TODO: Add SDKs for Firebase products that you want to use
 
// https://firebase.google.com/docs/web/setup#available-libraries
 
 
// Your web app's Firebase configuration
 
const firebaseConfig = {
 
  apiKey: "AIzaSyDFRAeIgMLMEwEo3Khu9y-TJCQ780cQUpA",
 
  authDomain: "foodlakh-f44cf.firebaseapp.com",
 
  databaseURL: "https://foodlakh-f44cf-default-rtdb.firebaseio.com",
 
  projectId: "foodlakh-f44cf",
 
  storageBucket: "foodlakh-f44cf.appspot.com",
 
  messagingSenderId: "555308865608",
 
  appId: "1:555308865608:web:7de83363c56f1df2c5207d"
 
};
 
 
// Initialize Firebase
 
let app = initializeApp(firebaseConfig);
export const fb = app.database();