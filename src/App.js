import React from "react";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import { Chat } from "./Components/Chat/Chat";

const App = () => {
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Routes>
          <Route path="/chat/:chatId" element={<Chat />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
