import React, { useState, useEffect } from "react";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth.js";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import "./App.css";

const cookies = new Cookies();

function ChatApp() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(
    localStorage.getItem("isInChat") === "true"
  );
  const [room, setRoom] = useState(localStorage.getItem("room") || "");

  const handleRoomEntry = () => {
    setIsInChat(true);
    localStorage.setItem("isInChat", "true");
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRoomEntry();
    }
  };

  useEffect(() => {
    if (isInChat) {
      localStorage.setItem("room", room);
    }
  }, [isInChat, room]);

  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className="room">
          <label> Type room name: </label>
          <input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            onKeyPress={handleInputKeyPress} // Handle Enter key press
          />
          <button onClick={handleRoomEntry}>Enter Chat</button>
        </div>
      ) : (
        <Chat room={room} />
      )}
    </AppWrapper>
  );
}

export default ChatApp;
