import { motion } from 'framer-motion';
import { useConversation } from '../context/ConversationContext';

const questions = [
  "What products do you offer?",
  "Tell me about pricing options",
  "How does this compare to competitors?",
  "Can I get a demo?"
];

const QuickQuestions = () => {
  const { addMessage, processMessage } = useConversation();

  const handleQuestionClick = (question) => {
    addMessage({ sender: 'user', content: question });
    processMessage(question);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <h3
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: '#6b7280', // gray-500
          marginBottom: 8,
        }}
      >
        Suggested questions:
      </h3>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        {questions.map((question, index) => (
          <motion.button
            key={question}
            onClick={() => handleQuestionClick(question)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb', // gray-200
              borderRadius: 9999,
              fontSize: 14,
              color: '#374151', // gray-700
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')} // gray-50
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
          >
            {question}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickQuestions;
