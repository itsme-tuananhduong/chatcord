import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { AuthContext } from "../../App";
import Message from "../../components/Message/Message";
import "./css/style.css";

const socket = io.connect("http://localhost:5000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});

socket.emit("joinRoom", {
  username: sessionStorage.getItem("username"),
  room: sessionStorage.getItem("roomId"),
});

function RandomChat() {
  console.log("randomchat");
  const [state, setState] = useState({ text: "" });
  const [chat, setChat] = useState([]);
  const authValue = useContext(AuthContext);
  const { user, randomChatRoom, setRandomChatRoom } = authValue;
  const { status, setStatus } = useState(randomChatRoom.status);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    socket.on("join", () => {
      console.log("join");
    });
    socket.on("message", ({ username, text, time }) => {
      setChat([...chat, { username, text, time }]);
    });
  });

  const onTextChange = (e) => {
    setState({ text: e.target.value });
  };

  const onChatFormSubmit = (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    // socket.emit("chatMessage", state.text);
    socket.emit("chatMessage", msg);

    // setState({ text: "" });
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
  };

  const renderChat = () => {
    // chatMessages.scrollTop = chatMessages.scrollHeight;
    // chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    // console.log(chatBoxRef.current.scrollTop);
    return chat.map((message) => (
      <Message
        username={message.username}
        text={message.text}
        time={message.time}
      />
    ));
  };

  const onLeave = () => {
    sessionStorage.setItem("roomId", "");
  };

  return (
    <div className="RandomChat">
      <div className="chat-container">
        <header className="chat-header">
          <h1>
            <i className="fas fa-smile"></i> ChatCord
          </h1>
          <div className="status">
            {status === "waiting" && (
              <>
                <div>please wait...</div>
              </>
            )}
            {status !== "waiting" && <></>}
          </div>
          <button className="btn" onClick={onLeave}>
            <Link to="/">Leave Room</Link>
          </button>
        </header>
        <main className="chat-main">
          <div className="chat-sidebar">
            <h3>
              <i className="fas fa-comments"></i> Room Name
            </h3>
            <h2 id="room-name">Random Chat Room</h2>
            {/* <h3>
              <i className="fas fa-users"></i> Users
            </h3> */}
            <ul id="users"></ul>
          </div>
          <div className="chat-messages" ref={chatBoxRef}>
            <div>{renderChat()}</div>
          </div>
        </main>
        <div className="chat-form-container">
          <form id="chat-form" onSubmit={onChatFormSubmit}>
            <input
              id="msg"
              type="text"
              placeholder="Enter Message"
              required
              autocomplete="off"
              // onChange={(e) => onTextChange(e)}
              value={state.message}
            />
            <button className="btn none-margin">
              <i className="fas fa-paper-plane"></i> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RandomChat;
