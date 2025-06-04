import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import SettingsPanel from './components/SettingsPanel';
import Sidebar from './components/Sidebar';
import { ConversationProvider } from './context/ConversationContext';
import { SettingsProvider } from './context/SettingsContext';
import { SpeechProvider } from './context/SpeechContext';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <SettingsProvider>
      <SpeechProvider>
        <ConversationProvider>
<<<<<<< HEAD
          <div style={styles.appContainer}>
            <Header
              onSettingsClick={() => setIsSettingsOpen(true)}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen} />
            <div style={styles.mainWrapper}>
=======
          <div
            style={{
              minHeight: '100vh',
              backgroundColor: '#f9fafb',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Header onSettingsClick={() => setIsSettingsOpen(true)} />
            <div
              style={{
                display: 'flex',
                flex: 1,
                position: 'relative',
              }}
            >
>>>>>>> ccedc040dadb8480a7874cfd645c7415eda22ed6
              <div
                style={{
                  overflow: 'hidden',
                  transition: 'width 0.3s ease',
                  width: isSidebarOpen ? '256px' : '0',
                }}
              >
                <Sidebar />
              </div>

<<<<<<< HEAD
=======
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                style={{
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
                }}
              >
                {isSidebarOpen ? (
                  <PanelLeftClose
                    style={{
                      width: '20px',
                      height: '20px',
                      color: '#4b5563',
                    }}
                  />
                ) : (
                  <PanelLeft
                    style={{
                      width: '20px',
                      height: '20px',
                      color: '#4b5563',
                    }}
                  />
                )}
              </button>
>>>>>>> ccedc040dadb8480a7874cfd645c7415eda22ed6

              <main
                style={{
                  flex: 1,
                }}
              >
                <ChatInterface />
              </main>
            </div>

            <SettingsPanel
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
            />
          </div>
        </ConversationProvider>
      </SpeechProvider>
    </SettingsProvider>
  );
}

<<<<<<< HEAD
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
  icon: {
    width: '20px',
    height: '20px',
    color: '#4b5563',
  },
  chatArea: {
    flex: 1,
  },
};

=======
>>>>>>> ccedc040dadb8480a7874cfd645c7415eda22ed6
export default App;
