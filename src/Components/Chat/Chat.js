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
import db from "../../api/Firebase";
import firebase from "firebase";
import { useStateValue } from "../redux/Stateprovider";

export const Chat = () => {
  const [logo, setLogo] = useState("");
  const [input, setInput] = useState("");
  const [chatName, setChatName] = useState("");
  const [message, setMessage] = useState([]);
  const { chatId } = useParams();

  const [{ user }, dispatch] = useStateValue();
  // console.log(chatName)

  useEffect(() => {
    if (chatId) {
      console.log({chatId});
      //for version less then 8
      db.collection("room")
        .doc(chatId)
        .onSnapshot((snapshot) => setChatName(snapshot.data().name));

      db.collection("room")
        .doc(chatId)
        .collection("message")
        .orderBy("timestamp", "asc")
        .onSnapshot((snap) => setMessage(snap.docs.map((doc) => doc.data())));
    }
  }, [chatId]);

  useEffect(() => {
    setLogo(Math.floor(Math.random() * 5000));
  }, []);

  const submitMsg = (e) => {
    e.preventDefault();
    console.log("data send :", input);

    //addDoc in the Firebase
    db.collection("room").doc(chatId).collection("message").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
    // console.log({input})
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
        {message?.map((msg) => (
          <p
            className={`${styles.chatMessage} ${
              true && styles.chatMessageReceiver
            }`}
          >
            <span className={styles.chatSenderName}>{msg.name}</span>
            {msg.message}
            <span className={styles.chatTimestamp}>
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
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
