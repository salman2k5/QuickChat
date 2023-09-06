import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";
import "../styles/Chat.css";

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emoji) => {
    setNewMessage((prevMessage) => prevMessage + emoji.native);
  };

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt", "asc")//   orderBy("createdAt") 
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h2>Welcome to room: {room.toUpperCase()}</h2>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="user">{message.user}:</span> {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button
          type="button"
          className="emoji-button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          🙂
        </button>
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
      {showEmojiPicker && (
        <div className="emoji-picker">
 <span role="img" aria-label="grinning face" onClick={() => handleEmojiClick({ native: "😀" })}>😀</span>
  <span role="img" aria-label="thumbs up" onClick={() => handleEmojiClick({ native: "👍" })}>👍</span>
  <span role="img" aria-label="heart eyes" onClick={() => handleEmojiClick({ native: "😍" })}>😍</span>
  <span role="img" aria-label="laughing face" onClick={() => handleEmojiClick({ native: "😆" })}>😆</span>
  <span role="img" aria-label="clapping hands" onClick={() => handleEmojiClick({ native: "👏" })}>👏</span>
  <span role="img" aria-label="fire" onClick={() => handleEmojiClick({ native: "🔥" })}>🔥</span>
  <span role="img" aria-label="party popper" onClick={() => handleEmojiClick({ native: "🎉" })}>🎉</span>
  <span role="img" aria-label="smiling face with sunglasses" onClick={() => handleEmojiClick({ native: "😎" })}>😎</span>
  <span role="img" aria-label="face with tears of joy" onClick={() => handleEmojiClick({ native: "😂" })}>😂</span>
  <span role="img" aria-label="sparkling heart" onClick={() => handleEmojiClick({ native: "💖" })}>💖</span>
  <span role="img" aria-label="thinking face" onClick={() => handleEmojiClick({ native: "🤔" })}>🤔</span>
  <span role="img" aria-label="ok hand" onClick={() => handleEmojiClick({ native: "👌" })}>👌</span>
  <span role="img" aria-label="heart" onClick={() => handleEmojiClick({ native: "❤️" })}>❤️</span>
  <span role="img" aria-label="raised hands" onClick={() => handleEmojiClick({ native: "🙌" })}>🙌</span>
  <span role="img" aria-label="thumbs down" onClick={() => handleEmojiClick({ native: "👎" })}>👎</span>
  <span role="img" aria-label="crying face" onClick={() => handleEmojiClick({ native: "😢" })}>😢</span>
  <span role="img" aria-label="heart suit" onClick={() => handleEmojiClick({ native: "♥️" })}>♥️</span>
  <span role="img" aria-label="thinking face" onClick={() => handleEmojiClick({ native: "🤔" })}>🤔</span>
  <span role="img" aria-label="angry face" onClick={() => handleEmojiClick({ native: "😡" })}>😡</span>
  <span role="img" aria-label="star" onClick={() => handleEmojiClick({ native: "⭐" })}>⭐</span>
  <span role="img" aria-label="heart suit" onClick={() => handleEmojiClick({ native: "♡" })}>♡</span>
        </div>
      )}
    </div>
  );
};