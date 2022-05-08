import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import db from "../../api/Firebase";

import styles from "./SidebarChat.module.css";

export const SidebarChat = ({ addNewChat, id, name }) => {
  // console.log(name)

  const [logo, setLogo] = useState("");
  const [message, setMessage] = useState("");
  // console.log(message);

  useEffect(() => {
    setLogo(Math.floor(Math.random() * 5000));
  }, []);

  //Set the latest msg in the user
  useEffect(() => {
    if (id) {
      db.collection("room")
        .doc(id)
        .collection("message")
        .orderBy("timestamp", "desc")
        .onSnapshot((snap) => setMessage(snap.docs.map((doc) => doc.data())));
    }
  }, [id]);

  const createChat = () => {
    const Chat = prompt("Enter the Chat Name");

    // add the new chat in the database
    if (Chat) {
      db.collection("room").add({
        name: Chat,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/chat/${id}`}>
      <div className={styles.sidebarChats}>
        <Avatar src={`https://avatars.dicebear.com/api/human/${logo}a23.svg`} />
        <div className={styles.sidebar_Chat_info}>
          <h2>{Object.values(name)}</h2>
          <p>{message[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className={styles.sidebarChats} onClick={createChat}>
      <h3>Add New Chat</h3>
    </div>
  );
};
