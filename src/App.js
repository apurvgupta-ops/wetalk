import React, { useState } from "react";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { Chat } from "./Components/Chat/Chat";
import { Login } from "./Components/Login/Login";
import { useStateValue } from "./Components/redux/Stateprovider";

const App = () => {
  const [user, setUser] = useState();
  // const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Sidebar />
          <Routes>
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/" element={<Chat />} />
          </Routes>
        </div>
      )}
    </div>
  );
};
export default App;
