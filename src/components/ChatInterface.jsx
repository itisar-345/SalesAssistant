import { useRef, useEffect } from 'react';
import MessageList from './MessageList';
import InputArea from './InputArea';
import { useConversation } from '../context/ConversationContext';
import { useSpeech } from '../context/SpeechContext';
import { Mic, MicOff } from 'lucide-react';

const ChatInterface = () => {
  const messagesEndRef = useRef(null);
  const { messages } = useConversation();
  const { isListening, startListening, stopListening, speechSupported } = useSpeech();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={styles.container}>
      <div style={styles.messageArea}>
        <div style={styles.messageInner}>
          <MessageList />
          <div ref={messagesEndRef} />
        </div>
      </div>

      {speechSupported && (
        <div style={styles.micButtonWrapper}>
          <button
            onClick={() => (isListening ? stopListening() : startListening())}
            aria-label={isListening ? 'Stop listening' : 'Start listening'}
            style={{
              ...styles.micButtonBase,
              ...(isListening ? styles.micButtonActive : styles.micButtonInactive),
            }}
          >
            {isListening ? <MicOff size={32} /> : <Mic size={32} />}
          </button>
        </div>
      )}

      <div style={styles.inputAreaWrapper}>
        <div style={styles.inputAreaInner}>
          <InputArea />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: 'calc(100vh - 64px)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  messageArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 16px',
  },
  messageInner: {
    maxWidth: '768px', // max-w-3xl = 48rem = 768px
    margin: '0 auto',
  },
  micButtonWrapper: {
    position: 'absolute',
    left: '50%',
    bottom: '128px', // bottom-32 (32 * 4 = 128px)
    transform: 'translateX(-50%)',
  },
  micButtonBase: {
    padding: '24px',
    borderRadius: '9999px', // fully rounded
    boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButtonActive: {
    backgroundColor: '#ef4444', // red-500
    color: '#ffffff',
    transform: 'scale(1.1)',
  },
  micButtonInactive: {
    backgroundColor: '#3b82f6', // blue-500
    color: '#ffffff',
  },
  inputAreaWrapper: {
    position: 'sticky',
    bottom: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e5e7eb', // border-gray-200
  },
  inputAreaInner: {
    maxWidth: '768px',
    margin: '0 auto',
  },
};

export default ChatInterface;
