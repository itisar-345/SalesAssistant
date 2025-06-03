import { Headphones, Info, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import LanguageSelector from './LanguageSelector';

const ConversationHeader = ({ currentLanguage, onLanguageChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'linear-gradient(to right, #2563eb, #4f46e5)', // blue-600 to indigo-700
        color: 'white',
        padding: 24,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <motion.div style={{ display: 'flex', alignItems: 'center'}} whileHover={{ scale: 1.02 }}>
          <Headphones size={32} style={{ marginRight: 12 }} />
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
              Conversational Intelligence
            </h1>
            <p style={{ fontSize: '0.875rem', opacity: 0.9, margin: 0 }}>
              Multilingual P2P Lending Assistant
            </p>
          </div>
        </motion.div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Settings"
            style={{
              padding: 8,
              width: 48,
              height: 48,
              borderRadius: 9999,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',  
              transition: 'background-color 0.2s ease-in-out',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Settings size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Information"
            style={{
              padding: 8,
              borderRadius: 9999,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transition: 'background-color 0.2s ease-in-out',
              width: 48, 
              height: 48,
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Info size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ConversationHeader;
