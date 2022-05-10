import { Button } from "@mui/material";
import {
  signInWithPopup,
  signInAnonymously,
  onAuthStateChanged,
} from "firebase/auth";
// import {  signInWithPopup } from "firebase/auth";

import React from "react";
import { auth, provider } from "../../api/Firebase";
import { actionTypes } from "../redux/reducer";
import { useStateValue } from "../redux/Stateprovider";

import styles from "./Login.module.css";
export const Login = () => {
  // const navigate  = useNavigate()
  const [{ }, dispatch] = useStateValue();
  const signIn = () => {
    signInAnonymously(auth, provider)
      .then((res) => {
        console.log(res);
        dispatch({
          type: actionTypes.SET_USER,
          user: res.user,
        });
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        alert(error.message);
      });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid)
    }
  });

  return (
    <div className={styles.login}>
      <div className={styles.login_container}>
        <div className={styles.login_text}>
          <h1> Hii Anonymous User</h1>
        </div>

        <Button onClick={signIn}>Sign in Anonymously</Button>
      </div>
    </div>
  );
};
