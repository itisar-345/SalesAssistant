import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NLPProcessor } from './utils/nlpProcessor';
import VoiceInput from './components/VoiceInput';
import MessageList from './components/MessageList';
import ConversationHeader from './components/ConversationHeader';

function App() {
  const [state, setState] = useState({
    messages: [],
    isRecording: false,
    isProcessing: false,
    error: null
  });

  const nlpProcessor = new NLPProcessor();

  const handleTranscript = useCallback(async (transcript) => {
    if (!transcript.trim()) return;
    
    // Add user message
    const userMessage = {
      id: uuidv4(),
      role: 'user',
      content: transcript,
      timestamp: new Date()
    };
    
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isProcessing: true
    }));
    
    try {
      // Process the user input
      const response = await nlpProcessor.processInput(transcript);
      
      // Add assistant message
      const assistantMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isProcessing: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: 'Failed to process your request. Please try again.'
      }));
    }
  }, [nlpProcessor]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f3f4f6', // gray-100
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 672, // max-w-2xl ~ 672px
          backgroundColor: '#fff',
          borderRadius: 12,
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ConversationHeader />

        <div
          style={{
            padding: 16,
            height: 384, // h-96 = 24rem = 384px
            overflowY: 'auto',
            flexGrow: 1,
          }}
        >
          <MessageList messages={state.messages} />
        </div>

        <div
          style={{
            borderTop: '1px solid #e5e7eb', // gray-200
            padding: 16,
            backgroundColor: '#f9fafb', // gray-50
          }}
        >
          <VoiceInput onTranscript={handleTranscript} isProcessing={state.isProcessing} />

          {state.error && (
            <div
              style={{
                marginTop: 8,
                padding: 8,
                backgroundColor: '#fee2e2', // red-100
                color: '#b91c1c', // red-700
                borderRadius: 6,
                fontSize: 14,
              }}
            >
              {state.error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;