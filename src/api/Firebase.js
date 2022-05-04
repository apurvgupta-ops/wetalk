import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUXTtDpdf808JsX2MbKcZ_G9WKTMJovho",
  authDomain: "wetalk-2c171.firebaseapp.com",
  projectId: "wetalk-2c171",
  storageBucket: "wetalk-2c171.appspot.com",
  messagingSenderId: "587669479921",
  appId: "1:587669479921:web:0ca45d0f3b0aa9cdd0a450",
};

//init Firebase App
initializeApp(firebaseConfig);

//init Service
const db = getFirestore();

//collection Ref
// const colRef = collection(db, 'room')


//get collection data
// getDocs(colRef). then((snapshot)=>{
//   console.log(snapshot.docs)
// })

const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;



// Ways
  // new way of getting the data from firebase
  // const docRef = doc(db, "room" );
  // const docSnap = getDocs(docRef);
  // if (docSnap.exists()) {
  //   console.log("Doc exists", docSnap.data());
  // } else {
  //   console.log("No doc found");
  // }


   // const q = query(collection(db,'room'))
  // const querySnapshot = getDocs(q)
  // querySnapshot.forEach((doc)=>{
  //   console.log(doc.id,"=>", doc.data())
  // })


  // Get Data from the firebase
  // useEffect(() => {
  //   db.collection("room").onSnapshot((snapshot) =>
  //     setChats(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         data: doc.data(),
  //       }))
  //     )
  //   );
  // }, []);