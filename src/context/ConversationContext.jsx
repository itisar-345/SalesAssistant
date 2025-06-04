import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSpeech } from './SpeechContext';
import { processQuery } from '../services/nlpService';

const ConversationContext = createContext(undefined);

const STORAGE_KEY = 'voice_assistant_conversations';

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }
  return context;
};

export const ConversationProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const { speak } = useSpeech();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      const convertedConversations = data.conversations.map((conv) => ({
        ...conv,
        timestamp: new Date(conv.timestamp),
      }));
      setConversations(convertedConversations);

      if (data.currentConversationId) {
        setCurrentConversationId(data.currentConversationId);
        const currentConv = data.allConversations[data.currentConversationId];
        if (currentConv) {
          const convertedMessages = currentConv.messages.map((msg) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }));
          setMessages(convertedMessages);
        }
      }
    }
  }, []);

  useEffect(() => {
    const allConversations = {};
    conversations.forEach((conv) => {
      allConversations[conv.id] = {
        id: conv.id,
        title: conv.title,
        messages: conv.id === currentConversationId ? messages : [],
        timestamp: conv.timestamp,
        score: conv.score,
      };
    });

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        conversations,
        currentConversationId,
        allConversations,
      })
    );
  }, [conversations, currentConversationId, messages]);

  const addMessage = useCallback((message) => {
    const newMessage = {
      ...message,
      id: uuidv4(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    if (!currentConversationId) {
      const newId = uuidv4();
      const title =
        message.content.slice(0, 30) +
        (message.content.length > 30 ? '...' : '');
      setCurrentConversationId(newId);
      setConversations((prev) => [
        {
          id: newId,
          title,
          timestamp: new Date(),
          messageCount: 1,
        },
        ...prev,
      ]);
    } else {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === currentConversationId
            ? { ...conv, messageCount: conv.messageCount + 1 }
            : conv
        )
      );
    }

    return newMessage;
  }, [currentConversationId]);

  const processMessage = useCallback(
    async (content) => {
      const pendingMessageId = uuidv4();
      setMessages((prev) => [
        ...prev,
        {
          id: pendingMessageId,
          sender: 'assistant',
          content: '',
          timestamp: new Date(),
        },
      ]);

      try {
        const response = await processQuery(content, messages);

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === pendingMessageId
              ? { ...msg, content: response, timestamp: new Date() }
              : msg
          )
        );

        speak(response);
      } catch (error) {
        const errorMessage =
          "I apologize, but I'm having trouble processing your request. Could you try again?";
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === pendingMessageId
              ? { ...msg, content: errorMessage, timestamp: new Date() }
              : msg
          )
        );
        speak(errorMessage);
      }
    },
    [messages, speak]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setCurrentConversationId(null);
  }, []);

  const rateConversation = useCallback((id, score) => {
    setConversations((prev) =>
      prev.map((conv) => (conv.id === id ? { ...conv, score } : conv))
    );
  }, []);

  const deleteConversation = useCallback(
    (id) => {
      setConversations((prev) => prev.filter((conv) => conv.id !== id));
      if (currentConversationId === id) {
        setCurrentConversationId(null);
        setMessages([]);
      }
    },
    [currentConversationId]
  );

  return (
    <ConversationContext.Provider
      value={{
        messages,
        addMessage,
        processMessage,
        clearMessages,
        conversations,
        currentConversationId,
        setCurrentConversationId,
        rateConversation,
        deleteConversation,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
