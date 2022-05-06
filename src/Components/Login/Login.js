import { Button } from "@mui/material";
// import {  signInWithPopup } from "firebase/auth";

import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../api/Firebase";
import { actionTypes } from "../redux/reducer";
import { useStateValue } from "../redux/Stateprovider";

import styles from "./Login.module.css";
export const Login = () => {
    // const navigate  = useNavigate()
  const [{},dispatch] = useStateValue();
  const signIn = () => {
    auth.signInWithPopup(provider)
      .then((res) => {
          console.log(res)
          dispatch({
            type:actionTypes.SET_USER,
            user: res.user
          })
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        alert(error.message)
      });
  };

  return (
    <div className={styles.login}>
      <div className={styles.login_container}>
        <div className={styles.login_text}>
          <h1> Sign in to Whatsapp</h1>
        </div>

        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  );
};
