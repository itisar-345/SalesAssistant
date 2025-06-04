import { motion } from 'framer-motion';
import { formatRelativeTime } from '../utils/timeUtils';
import TypingIndicator from './TypingIndicator';
import { MessageSquare } from 'lucide-react';

const MessageItem = ({ message, onFollowUpClick }) => {
  const isUser = message.sender === 'user';

  // Follow-up questions based on the current context
  const getFollowUpQuestions = (content) => {
    const lowerContent = content.toLowerCase();

    if (lowerContent.includes('product')) {
      return [
        "What are the key features?",
        "How much does it cost?",
        "Can I get a demo?",
        "How does it compare to competitors?"
      ];
    }

    if (lowerContent.includes('price') || lowerContent.includes('cost')) {
      return [
        "Are there any discounts available?",
        "What's included in this price?",
        "Do you offer monthly billing?",
        "What's your refund policy?"
      ];
    }

    if (lowerContent.includes('feature')) {
      return [
        "How does this feature work?",
        "Are there any limitations?",
        "Can you show me an example?",
        "What other features are related to this?"
      ];
    }

    if (lowerContent.includes('compare') || lowerContent.includes('competitor')) {
      return [
        "What are your unique advantages?",
        "How is your support different?",
        "Can you compare pricing plans?",
        "What features do you have that others don't?"
      ];
    }

    return [
      "Can you explain more about this?",
      "How does this work in practice?",
      "What are the next steps?",
      "Can you provide some examples?"
    ];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 24,
      }}
    >
      <div
        style={{
          maxWidth: '80%',
          order: isUser ? 1 : 2,
        }}
      >
        <div
          style={{
            borderRadius: 24,
            padding: '12px 16px',
            backgroundColor: isUser ? '#3b82f6' : '#fff',
            color: isUser ? '#fff' : '#1f2937',
            borderTopRightRadius: isUser ? 0 : 24,
            borderTopLeftRadius: isUser ? 24 : 0,
            boxShadow: isUser
              ? 'none'
              : '0 1px 3px rgba(0,0,0,0.1)',
            border: isUser ? 'none' : '1px solid #f3f4f6',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
          }}
        >
          {message.content ? (
            <p style={{ margin: 0 }}>{message.content}</p>
          ) : (
            <TypingIndicator />
          )}
        </div>

        <div
          style={{
            fontSize: 12,
            color: '#6b7280', // gray-500
            marginTop: 4,
            textAlign: isUser ? 'right' : 'left',
          }}
        >
          {formatRelativeTime(message.timestamp)}
        </div>

        {!isUser && message.content && (
          <div style={{ marginTop: 12 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 12,
                color: '#6b7280',
                marginBottom: 8,
              }}
            >
              <MessageSquare size={12} />
              <span>Suggested follow-up questions:</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
              }}
            >
              {getFollowUpQuestions(message.content).map((question, index) => (
                <button
                  key={index}
                  onClick={() => onFollowUpClick(question)}
                  style={{
                    fontSize: 12,
                    padding: '4px 8px',
                    borderRadius: 9999,
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MessageItem;
