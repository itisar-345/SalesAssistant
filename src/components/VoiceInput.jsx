import { useEffect, useState } from 'react';
import { Mic, MicOff, Loader2, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpeechRecognitionService } from '../utils/speechRecognition';

const VoiceInput = ({ onTranscript, isProcessing, currentLanguage }) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const [volume, setVolume] = useState(0);
  const [recognitionService, setRecognitionService] = useState(null);

  useEffect(() => {
    const service = new SpeechRecognitionService(
      (transcript) => {
        onTranscript(transcript);
        setIsListening(false);
      },
      (err) => setError(err),
      (listening) => setIsListening(listening),
      currentLanguage
    );

    setRecognitionService(service);

    return () => {
      if (service) {
        service.stop();
      }
    };
  }, [onTranscript, currentLanguage]);

  useEffect(() => {
    if (recognitionService) {
      recognitionService.setLanguage(currentLanguage);
    }
  }, [currentLanguage, recognitionService]);

  const toggleListening = () => {
    if (!recognitionService) return;

    if (isListening) {
      recognitionService.stop();
    } else {
      setError(null);
      recognitionService.start();
    }
  };

  useEffect(() => {
    let interval;
    if (isListening) {
      interval = setInterval(() => {
        setVolume(Math.random());
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isListening]);

    return (
    <div style={{ width: '100%' }}>
      <motion.div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            {isListening && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                style={{
                  position: 'absolute',
                  top: -16,
                  right: -16,
                  bottom: -16,
                  left: -16,
                  backgroundColor: 'rgba(191, 219, 254, 0.5)', // blue-100 opacity-50
                  borderRadius: '9999px', // rounded-full
                  opacity: 0.5,
                  transform: `scale(${1 + volume * 0.5})`,
                }}
              />
            )}
          </AnimatePresence>

          <motion.button
            onClick={toggleListening}
            disabled={isProcessing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isListening ? 'Stop recording' : 'Start recording'}
            style={{
              position: 'relative',
              padding: 24,
              borderRadius: '9999px',
              backgroundColor: isListening ? '#ef4444' : '#3b82f6', // red-500 or blue-500
              border: 'none',
              color: '#fff',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              opacity: isProcessing ? 0.5 : 1,
              boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.5), 0 4px 6px -2px rgba(239, 68, 68, 0.3)',
              transition: 'background-color 0.3s',
              userSelect: 'none',
            }}
            onMouseEnter={(e) => {
              if (!isProcessing) {
                e.currentTarget.style.backgroundColor = isListening ? '#dc2626' : '#2563eb'; // hover red-600 or blue-600
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(220, 38, 38, 0.7), 0 4px 6px -2px rgba(220, 38, 38, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isProcessing) {
                e.currentTarget.style.backgroundColor = isListening ? '#ef4444' : '#3b82f6';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(239, 68, 68, 0.5), 0 4px 6px -2px rgba(239, 68, 68, 0.3)';
              }
            }}
          >
            {isProcessing ? (
              <Loader2 style={{ height: 32, width: 32, animation: 'spin 1s linear infinite' }} />
            ) : isListening ? (
              <MicOff style={{ height: 32, width: 32 }} />
            ) : (
              <Mic style={{ height: 32, width: 32 }} />
            )}
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {isListening && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Volume2 style={{ height: 16, width: 16, color: '#3b82f6' }} />
              <div style={{ display: 'flex', gap: 4 }}>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: Math.random() * 20 + 10,
                      backgroundColor: ['#3B82F6', '#60A5FA'][Math.floor(Math.random() * 2)],
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                      width: 4,
                      borderRadius: 9999,
                      backgroundColor: '#3b82f6',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ textAlign: 'center' }}>
          {isListening ? (
            <p style={{ color: '#16a34a', fontWeight: 500 }}>Listening...</p> // text-green-600
          ) : isProcessing ? (
            <p style={{ color: '#2563eb', fontWeight: 500 }}>Processing your request...</p> // text-blue-600
          ) : (
            <p style={{ color: '#4b5563' }}>Click the microphone to speak</p> // text-gray-600
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              marginTop: 16,
              padding: 12,
              backgroundColor: '#fee2e2', // red-100
              color: '#b91c1c', // red-700
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
};

export default VoiceInput;
