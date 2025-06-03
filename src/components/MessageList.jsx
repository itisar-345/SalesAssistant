import { useEffect, useRef } from 'react';
import { MessageSquare, User } from 'lucide-react';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '16rem',
          color: '#6b7280', // Tailwind's gray-500
          textAlign: 'center',
        }}
      >
        <MessageSquare style={{ height: '3rem', width: '3rem', marginBottom: '0.5rem' }} />
        <p>Your conversation will appear here</p>
        <p style={{ fontSize: '0.875rem' }}>Try asking about our products, pricing, or services</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
      {messages.map((message) => {
        const isUser = message.role === 'user';
        return (
          <div
            key={message.id}
            style={{
              display: 'flex',
              justifyContent: isUser ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                backgroundColor: isUser ? '#3b82f6' : '#e5e7eb', // blue-500 or gray-200
                color: isUser ? '#ffffff' : '#1f2937', // white or gray-800
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.25rem',
                }}
              >
                {isUser ? (
                  <>
                    <span style={{ fontWeight: 500 }}>You</span>
                    <User style={{ height: '1rem', width: '1rem', marginLeft: '0.25rem' }} />
                  </>
                ) : (
                  <>
                    <MessageSquare style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} />
                    <span style={{ fontWeight: 500 }}>Assistant</span>
                  </>
                )}
              </div>
              <p>{message.content}</p>
              <div
                style={{
                  fontSize: '0.75rem',
                  opacity: 0.7,
                  marginTop: '0.25rem',
                }}
              >
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
