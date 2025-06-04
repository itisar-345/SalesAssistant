import { Settings, PlusCircle, PanelLeftClose, PanelLeft } from 'lucide-react';
import { useConversation } from '../context/ConversationContext';

const Header = ({ onSettingsClick, isSidebarOpen, setIsSidebarOpen }) => {
  const { clearMessages } = useConversation();

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Sidebar Toggle Button */}
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
        <div style={styles.leftGroup}>
        <div style={styles.leftSection}>
          <div style={styles.logoCircle}>
            <span style={styles.logoText}>AI</span>
          </div>
          <div style={styles.titleContainer}>
            <h1 style={styles.title}>Sales Assistant</h1>
            <p style={styles.subtitle}>Your multilingual sales companion</p>
          </div>
        </div>

        <div style={styles.rightSection}>
          <button
            onClick={clearMessages}
            aria-label="Start a new chat"
            style={styles.newChatButton}
          >
            <PlusCircle style={styles.plusIcon} />
            <span style={styles.newChatText}>New Chat</span>
          </button>

          <button
            onClick={onSettingsClick}
            aria-label="Settings"
            style={styles.settingsButton}
          >
            <Settings style={styles.settingsIcon} />
          </button>
        </div>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    background: 'linear-gradient(to right, #2563eb, #1e40af)', // from-blue-600 to-blue-800
    boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.7), 0 4px 6px -4px rgba(37, 99, 235, 0.7)', // approximate shadow-lg
    position: 'relative',
    zIndex: 10,
  },
  container: {
    maxWidth: '1280px', // max-w-7xl
    margin: '0 auto',
    padding: '1rem 1.5rem', // py-4 px-4 sm:px-6 lg:px-8
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
 leftGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem', // Add space between toggle and logo/text
 },
  toggleButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem', // Add some padding for click area
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '0.75rem', // Add space between the toggle and logo
    color: 'white', // Set icon color to white
    transition: 'color 0.2s ease', // Smooth transition for hover
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem', // gap-3
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logoCircle: {
    width: '40px', // w-10
    height: '40px', // h-10
    borderRadius: '9999px', // rounded-full
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // bg-white/10
    backdropFilter: 'blur(8px)', // backdrop-blur-sm
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.2)', // border-white/20
    fontWeight: 600,
    fontSize: '1.125rem', // text-lg
  },
  logoText: {
    fontWeight: 600,
    fontSize: '1.125rem',
    userSelect: 'none',
  },
  title: {
    fontSize: '1.25rem', // text-xl
    fontWeight: 600,
    color: 'white',
    margin: 0,
    userSelect: 'none',
    display: 'none', // hidden sm:block - will show below in media query
  },
  subtitle: {
    fontSize: '0.875rem', // text-sm
    color: '#bfdbfe', // text-blue-100
    margin: 0,
    userSelect: 'none',
    display: 'none', // hidden sm:block - show below
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem', // gap-2
  },
  newChatButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem', // gap-1.5
    padding: '0.375rem 0.75rem', // py-1.5 px-3
    fontSize: '0.875rem', // text-sm
    color: 'white',
    backgroundColor: 'transparent',
    borderRadius: '9999px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    border: 'none',
  },
  plusIcon: {
    width: '16px', // w-4
    height: '16px', // h-4
  },
  newChatText: {
    display: 'none', // hidden sm:inline - show below in media query
  },
  settingsButton: {
    padding: '0.5rem',
    borderRadius: '9999px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    border: 'none',
    color: 'white',
  },
  settingsIcon: {
    width: '20px', // w-5
    height: '20px', // h-5
  },
  icon: {
    width: '24px', // Increased size slightly for visibility
    height: '24px',
    color: 'white', // Ensure icon is white
  },
};

export default Header;
