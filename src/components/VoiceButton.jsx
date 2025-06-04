import React, { useState } from "react";
import { getCache, setCache } from "../utils/sessionCache";
import "../css/VoiceButton.css";

function VoiceButton() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const speech = event.results[0][0].transcript;
      setTranscript(speech);
      const cached = getCache("voiceCommands") || [];
      const updated = [speech, ...cached].slice(0, 50);
      setCache("voiceCommands", updated);
    };

    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className="voice-button-container">
      <button className="voice-button" onClick={handleVoiceInput}>
        🎤 {isListening ? "Listening..." : "Speak"}
      </button>
      {transcript && <div className="transcript">You said: "{transcript}"</div>}
    </div>
  );
}

export default VoiceButton;
