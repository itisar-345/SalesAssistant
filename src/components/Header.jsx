import { Settings, PlusCircle } from 'lucide-react';
import { useConversation } from '../context/ConversationContext';

const Header = ({ onSettingsClick }) => {
  const { clearMessages } = useConversation();

  return (
    <header
      style={{
        background: 'linear-gradient(to right, #2563eb, #1e40af)',
        boxShadow:
          '0 10px 15px -3px rgba(59, 130, 246, 0.7), 0 4px 6px -4px rgba(37, 99, 235, 0.7)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontWeight: 600,
              fontSize: '1.125rem',
              userSelect: 'none',
            }}
          >
            AI
          </div>
          <div>
            <h1
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'white',
                margin: 0,
                userSelect: 'none',
              }}
            >
              SalesAssist AI
            </h1>
            <p
              style={{
                fontSize: '0.875rem',
                color: '#bfdbfe',
                margin: 0,
                userSelect: 'none',
              }}
            >
              Your multilingual sales companion
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <button
            onClick={clearMessages}
            aria-label="Start a new chat"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.375rem 0.75rem',
              fontSize: '0.875rem',
              color: 'white',
              backgroundColor: 'transparent',
              borderRadius: '9999px',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              border: 'none',
            }}
          >
            <PlusCircle style={{ width: '16px', height: '16px' }} />
            <span>
              New Chat
            </span>
          </button>

          <button
            onClick={onSettingsClick}
            aria-label="Settings"
            style={{
              padding: '0.5rem',
              borderRadius: '9999px',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              border: 'none',
              color: 'white',
            }}
          >
            <Settings style={{ width: '20px', height: '20px' }} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
