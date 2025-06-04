import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import SettingsPanel from './components/SettingsPanel';
import Sidebar from './components/Sidebar';
import { ConversationProvider } from './context/ConversationContext';
import { SettingsProvider } from './context/SettingsContext';
import { SpeechProvider } from './context/SpeechContext';
import { PanelLeftClose, PanelLeft } from 'lucide-react';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <SettingsProvider>
      <SpeechProvider>
        <ConversationProvider>
          <div style={styles.appContainer}>
            <Header onSettingsClick={() => setIsSettingsOpen(true)} />
            <div style={styles.mainWrapper}>
              <div
                style={{
                  ...styles.sidebar,
                  width: isSidebarOpen ? '256px' : '0',
                }}
              >
                <Sidebar />
              </div>

              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
                style={styles.toggleButton}
              >
                {isSidebarOpen ? (
                  <PanelLeftClose style={styles.icon} />
                ) : (
                  <PanelLeft style={styles.icon} />
                )}
              </button>

              <main style={styles.chatArea}>
                <ChatInterface />
              </main>
            </div>

            <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
          </div>
        </ConversationProvider>
      </SpeechProvider>
    </SettingsProvider>
  );
}

const styles = {
  appContainer: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    display: 'flex',
    flexDirection: 'column',
  },
  mainWrapper: {
    display: 'flex',
    flex: 1,
    position: 'relative',
  },
  sidebar: {
    overflow: 'hidden',
    transition: 'width 0.3s ease',
  },
  toggleButton: {
    position: 'absolute',
    left: 0,
    top: '1rem',
    backgroundColor: '#ffffff',
    padding: '0.5rem',
    borderTopRightRadius: '0.5rem',
    borderBottomRightRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  icon: {
    width: '20px',
    height: '20px',
    color: '#4b5563',
  },
  chatArea: {
    flex: 1,
  },
};

export default App;
