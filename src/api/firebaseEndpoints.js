import { collection, getDocs, getDoc, doc} from "firebase/firestore";
import db from "./Firebase";

const colRef = collection(db, "room");
export const fetchingData = ({ setChats }) => {
  //get collection data
  getDocs(colRef).then((snapshot) => {
    setChats(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
    );
    // console.log(snapshot.docs);
  });
};
