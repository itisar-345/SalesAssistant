import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useConversation } from '../context/ConversationContext';
import { useSpeech } from '../context/SpeechContext';
import { useSettings } from '../context/SettingsContext';
import VoiceWaveform from './VoiceWaveform';

const InputArea = () => {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const { addMessage, processMessage } = useConversation();
  const { selectedLanguage } = useSettings();
  const { isListening, transcript, resetTranscript } = useSpeech();

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
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.relative}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Type or speak in ${selectedLanguage.name}...`}
            rows={1}
            style={{
              ...styles.textarea,
              minHeight: '60px',
            }}
          />

          <button
            type="submit"
            aria-label="Send message"
            disabled={!input.trim()}
            style={{
              ...styles.sendButton,
              ...(input.trim()
                ? styles.sendButtonActive
                : styles.sendButtonDisabled),
            }}
          >
            <Send size={20} />
          </button>
        </div>

        {isListening && (
          <div style={styles.listeningContainer}>
            <VoiceWaveform />
            <p style={styles.listeningText}>Listening in {selectedLanguage.name}...</p>
          </div>
        )}
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '16px',
  },
  form: {
    position: 'relative',
  },
  relative: {
    position: 'relative',
  },
  textarea: {
    width: '100%',
    padding: '12px 48px 12px 16px', // right padding to leave space for button
    borderRadius: '16px',
    border: '1px solid #e5e7eb', // gray-200
    backgroundColor: '#f9fafb', // gray-50
    resize: 'none',
    outline: 'none',
    fontSize: '16px',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    transition: 'box-shadow 0.2s ease',
  },
  sendButton: {
    position: 'absolute',
    right: '8px',
    bottom: '8px',
    padding: '10px',
    borderRadius: '16px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
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

export default InputArea;
