import { useState } from 'react';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', native: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', flag: '🇮🇳', native: 'বাংলা' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳', native: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳', native: 'தமிழ்' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        style={{
          padding: 8,
          width: 48,
          height: 48,
          borderRadius: 9999,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          transition: 'background-color 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          gap: 8,
          border: 'none',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
      >
        <Globe size={20} />
        <span style={{ fontSize: '1rem' }}>
          {supportedLanguages.find((lang) => lang.code === currentLanguage)?.flag}
        </span>
      </motion.button>

      <motion.div
        initial={false}
        animate={
          isOpen
            ? { opacity: 1, y: 0, display: 'block' }
            : { opacity: 0, y: -20, display: 'none' }
        }
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute',
          right: 0,
          marginTop: 8,
          width: 224,
          backgroundColor: '#ffffff',
          borderRadius: 12,
          boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
          zIndex: 50,
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.05)',
          maxHeight: '384px',
          overflowY: 'auto',
        }}
      >
        <div style={{ paddingTop: 8, paddingBottom: 8 }}>
          {supportedLanguages.map((language) => {
            const isActive = currentLanguage === language.code;
            return (
              <motion.button
                key={language.code}
                whileHover={{ backgroundColor: '#f3f4f6' }}
                onClick={() => {
                  onLanguageChange(language.code);
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  backgroundColor: isActive ? '#eff6ff' : 'transparent',
                  color: isActive ? '#2563eb' : '#374151',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 20 }}>{language.flag}</span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 500 }}>{language.name}</span>
                  {language.native && (
                    <span style={{ fontSize: 12, color: '#6b7280' }}>{language.native}</span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default LanguageSelector;
