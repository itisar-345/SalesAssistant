import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useConversation } from '../context/ConversationContext';
import { useSpeech } from '../context/SpeechContext';
import { useSettings } from '../context/SettingsContext'; // Import useSettings
import VoiceWaveform from './VoiceWaveform'; // Import VoiceWaveform

const InputArea = () => {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const { addMessage, processMessage } = useConversation();
  const { selectedLanguage } = useSettings();
  const { isListening, transcript, resetTranscript, startListening, stopListening } = useSpeech(); // Destructure startListening and stopListening

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (!input.trim()) return;

    addMessage({ sender: 'user', content: input.trim() });
    processMessage(input.trim());
    setInput('');
    resetTranscript();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Type or speak in ${selectedLanguage.name}...`}
            rows={1}
            style={{
              width: '100%',
              padding: '12px 48px 12px 16px',
              borderRadius: '16px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#f9fafb',
              resize: 'none',
              outline: 'none',
              fontSize: '16px',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
              transition: 'box-shadow 0.2s ease',
              minHeight: '60px',
            }}
          />

          <button
            disabled={!input.trim()}
            style={{
              position: 'absolute',
              right: '8px',
              bottom: '8px',
              padding: '10px',
              borderRadius: '16px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              backgroundColor: input.trim() ? '#3b82f6' : '#f3f4f6',
              color: input.trim() ? 'white' : '#9ca3af',
              boxShadow: input.trim()
                ? '0 4px 6px -1px rgba(59, 130, 246, 0.5), 0 2px 4px -1px rgba(59, 130, 246, 0.06)'
                : 'none',
              cursor: input.trim() ? 'pointer' : 'not-allowed',
            }}
          >
            <Send size={20} />
          </button>
        </div>

<<<<<<< HEAD
        {/* Voice waveform indicator */}
        {isListening && ( // Conditionally render the listening indicator
          <div style={styles.listeningContainer}>
            <VoiceWaveform /> {/* Render VoiceWaveform here */}
            <p style={styles.listeningText}>Listening in {selectedLanguage.name}...</p>
=======
        {isListening && (
          <div
            style={{
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              color: '#2563eb',
            }}
          >
            <VoiceWaveform />
            <p style={{ fontSize: '14px', fontWeight: '500' }}>
              Listening in {selectedLanguage.name}...
            </p>
>>>>>>> ccedc040dadb8480a7874cfd645c7415eda22ed6
          </div>
        )}


      </form>
    </div>
  );
};

<<<<<<< HEAD
const styles = {
  container: {
    padding: '16px',
  },
  form: {
    position: 'relative', // Position relative for the send button
  },
  relative: {
    position: 'relative',
  },
  textarea: {
    width: '100%',
    padding: '12px 48px 12px 16px', // right padding to leave space for button
    borderRadius: '16px',
    border: '1px solid #e5e7eb', // gray-200
    outline: 'none',
    fontSize: '16px',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    transition: 'box-shadow 0.2s ease',
    resize: 'none', // Add this line to disable resizing
  },
  sendButton: {
    position: 'absolute', // Absolute position the button
    right: '8px',
    bottom: '8px', // Position it correctly
    padding: '10px',
    borderRadius: '16px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease', // Smooth transition for hover/active states
  },
  sendButtonActive: {
    backgroundColor: '#3b82f6', // blue-500
    color: 'white',
    boxShadow:
      '0 4px 6px -1px rgba(59, 130, 246, 0.5), 0 2px 4px -1px rgba(59, 130, 246, 0.06)', // shadow-md blue
  },
  sendButtonDisabled: {
    backgroundColor: '#f3f4f6', // gray-100
    color: '#9ca3af', // gray-400
    cursor: 'not-allowed',
  },

  listeningContainer: {
    marginTop: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    color: '#2563eb', // blue-600
  },
  listeningText: {
    fontSize: '14px',
    fontWeight: '500',
  },
};

=======
>>>>>>> ccedc040dadb8480a7874cfd645c7415eda22ed6
export default InputArea;
