import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";

import styles from "./SidebarChat.module.css";

export const SidebarChat = ({ addNewChat }) => {
  const [logo, setLogo] = useState("");

  useEffect(() => {
    setLogo(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const Chat = prompt("Enter the Chat Name");
  };

  return !addNewChat ? (
    <div className={styles.sidebarChats}>
      <Avatar src={`https://avatars.dicebear.com/api/human/${logo}a23.svg`} />
      <div className={styles.sidebar_Chat_info}>
        <h2>Apurv Gupta</h2>
        <p>this is a message</p>
      </div>
    </div>
  ) : (
    <div className={styles.sidebarChats} onClick={createChat}>
      <h3>Add New Chat</h3>
    </div>
  );
};
