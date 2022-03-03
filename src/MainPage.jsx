import React, { useEffect, useRef, useState } from "react";
import { Fade } from "react-reveal";

function MainPage() {
  const localHistory = JSON.parse(localStorage.getItem("chatHistory"));
  const [chatHistory, setChatHistory] = useState(localHistory || []);
  const [chat, setChat] = useState({ user: "", bot: "" });
  const messageEl = useRef(null);
  const handleChange = (e) => {
    setChat({ user: e.target.value, bot: e.target.value });
  };

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (e) => {
        const { currentTarget: target } = e;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  const handleSubmit = () => {
    localStorage.setItem("chatHistory", JSON.stringify([...chatHistory, chat]));
    setChatHistory([...chatHistory, chat]);
    setChat({ user: "" });
  };

  return (
    <>
      <header>
        <div className="container">
          <div className="sub-container">
            <span className="chatbot-icon">🤖</span>
            <p id="chatbot-name">Mirrorbot</p>
          </div>
          <div className="sub-container">
            <p>Online</p>
            <span id="green-circle"></span>
          </div>
        </div>
      </header>

      <div className="chat-window" ref={messageEl}>
        {chatHistory.map((chat, idx) => (
          <div key={idx}>
            <p className="user-chat-bubble">{chat.user}</p>
            <Fade>
              <p className="chatbot-chat-bubble">{chat.bot}</p>
            </Fade>
          </div>
        ))}
      </div>

      <div className="container">
        <input
          type="text"
          className="userInput"
          onChange={handleChange}
          value={chat.user}
        />
        <button type="submit" onClick={handleSubmit}>
          Send
        </button>
      </div>
    </>
  );
}

export default MainPage;
