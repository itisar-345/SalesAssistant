import React, { useState } from "react";
import PopularQuestions from "./components/PopularQuestions";
import VoiceButton from "./components/VoiceButton";
import SideNav from "./components/SideNav";
import "./App.css";

function App() {
  const [sideNavOpen, setSideNavOpen] = useState(true);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  return (
    <div className={`App ${sideNavOpen ? "side-nav-open" : "side-nav-closed"}`}>
      <SideNav isOpen={sideNavOpen} />
      <header className="app-header">
        <button className="side-nav-toggle" onClick={toggleSideNav}>
          {sideNavOpen ? "⬅" : "➡"}
        </button>
        <div className="header-content">
          <h1>Your Assistant</h1>
          <p>Multi-language · Secure & Private</p>
          <h3>Welcome! How can I assist you today?</h3>
        </div>
      </header>
      <main>
        <PopularQuestions />
      </main>
      <VoiceButton />
    </div>
  );
}

export default App;
