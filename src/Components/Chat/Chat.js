import { Avatar, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import styles from "./Chat.module.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import SendIcon from "@mui/icons-material/Send";
import { Link, useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { fetchData, fetchingData } from "../../api/firebaseEndpoints";
import db from "../../api/Firebase";

export const Chat = () => {
  const [input, setInput] = useState("");
  const [logo, setLogo] = useState("");
  const [chatName, setChatName] = useState("");
  const { chatId } = useParams();
  // console.log(chatName)

  useEffect(() => {
    if (chatId) {
      // console.log({chatId});
      const docRef = doc(db, "room", chatId);
      getDoc(docRef).then((doc) => {
        setChatName(doc.data()?.name);
        // console.log(doc.data()?.name,"->", doc.id);
      });
    }
  }, [chatId]);

  useEffect(() => {
    setLogo(Math.floor(Math.random() * 5000));
  }, []);

  const submitMsg = (e) => {
    e.preventDefault();
    console.log("data send :", input);

    setInput("");
    // console.log({input})j
  };

  return (
    <div className={styles.chat}>
      <div className={styles.chatHeader}>
        <Avatar src={`https://avatars.dicebear.com/api/human/${logo}a23.svg`} />
        <div className={styles.chatHeader_info}>
          <h2>{chatName}</h2>
          <p>Last Seen...</p>
        </div>

        <div className={styles.chatHeader_right}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className={styles.chatBox}>
        <p
          className={`${styles.chatMessage} ${
            true && styles.chatMessageReceiver
          }`}
        >
          <span className={styles.chatSenderName}>Apurv</span>
          helo
          <span className={styles.chatTimestamp}>5:00 pm</span>
        </p>
      </div>

      <div className={styles.chatFooter}>
        <InsertEmoticonIcon />
        <form>
          <input
            type="text"
            placeholder="Type a Message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={submitMsg}>
            <SendIcon />
          </button>
        </form>
        <SettingsVoiceIcon />
      </div>
    </div>
  );
};
