import React, { useEffect, useState } from "react";
import "../css/ChatBox.css";
import { getCache, setCache } from "../utils/sessionCache";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const cachedMessages = getCache("chatHistory");
    if (cachedMessages) setMessages(cachedMessages);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      type: "user",
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, userMessage];
      setCache("chatHistory", updatedMessages);
      return updatedMessages;
    });

    // Store user input into voiceCommands (sidebar)
    const commands = getCache("voiceCommands") || [];
    const updatedCommands = [...commands, input];
    setCache("voiceCommands", updatedCommands);

    setInput("");

    // Simulated bot reply after delay
    setTimeout(() => {
      const botMessage = {
        text: "Sure, let me help you with that!",
        type: "bot",
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prevMessages) => {
        const finalMessages = [...prevMessages, botMessage];
        setCache("chatHistory", finalMessages);
        return finalMessages;
      });
    }, 1000);
  };

  const handleClear = () => {
    setMessages([]);
    setInput("");
    setCache("chatHistory", []);
    setCache("voiceCommands", []);
  };

  return (
    <div className="chatbox-container">
      <h2 className="chatbox-title">Your Chat</h2>
      <div className="chatbox-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.type}`}>
            <div className="chat-text">{msg.text}</div>
            <div className="chat-time">{msg.time}</div>
          </div>
        ))}
      </div>
      <div className="chatbox-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
        <button className="clear-btn" onClick={handleClear}>🗑️</button>
      </div>
    </div>
  );
}

export default ChatBox;
