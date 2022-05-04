import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import DonutLarge from "@mui/icons-material/DonutLarge";
import { MoreVert } from "@mui/icons-material";
import { Chat } from "@mui/icons-material";
import { SearchOutlined } from "@mui/icons-material";

import styles from "./Sidebar.module.css";
import { SidebarChat } from "../Sidebar Chat/SidebarChat";
import db from "../../api/Firebase";
import { collection,getDocs } from "firebase/firestore";

export const Sidebar = () => {
  const [chats, setChats] = useState([]);
  // console.log(chats)
  useEffect(() => {
    const colRef = collection(db, "room");
    //get collection data
    getDocs(colRef).then((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      console.log(snapshot.docs);
    });
  }, []);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <Avatar />
        <div className={styles.sidebar_headerRight}>
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className={styles.sidebar_search}>
        <div className={styles.sidebar_searchContainer}>
          <SearchOutlined />
          <input placeholder="Search or start the new chat" type="text" />
        </div>
      </div>

      <div className={styles.sidebar_chats}>
        <SidebarChat addNewChat />
        {chats.map((chat, index) =>
          // console.log(chat.data)
          <SidebarChat key={index} id={chat.id} name={chat.data} />
        )}
      </div>
    </div>
  );
};
