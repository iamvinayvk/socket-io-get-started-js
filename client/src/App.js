import React from "react";
import { io } from "socket.io-client";
import "./App.css";

const App = () => {
  const socket = io("http://localhost:3001");
  const [username, setUsername] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [message, setMessage] = React.useState("");
  const [recievedMessage, setRecievedMessage] = React.useState([]);
  const handleMessageSend = (message) => {
    const payload = {
      name: name,
      message: message,
    };
    socket.emit("message", JSON.stringify(payload));
    setMessage("");
  };
  socket.on("message", (msg) => {
    setRecievedMessage([...recievedMessage, JSON.parse(msg)]);
  });

  const handleKeyPress = (e, work = "chat") => {
    if (e.key === "Enter") {
      if (work === "username") {
        setName(username);
      } else {
        handleMessageSend(message);
      }
    }
  };
  return (
    <div className="app">
      {name ? (
        <div>
          <div className="header">Socket IO Client</div>
          <div className="message-area">
            {recievedMessage?.map((message, index) => {
              return (
                <div
                  key={index}
                  className={`message-area__message ${
                    name === message.name ? "message-own" : ""
                  }`}
                >
                  {message.name}-{message.message}
                </div>
              );
            })}
          </div>
          <div className="input-area">
            <input
              type="text"
              className="input-area__box"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e)}
            />
            <button
              className="input-area__button"
              onClick={() => handleMessageSend(message)}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div>hey user enter your username first</div>
          <div className="input-area">
            <input
              type="text"
              className="input-area__box"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, "username")}
            />
            <button
              type="submit"
              className="input-area__button"
              onClick={() => setName(username)}
            >
              Enter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
