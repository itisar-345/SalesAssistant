import { MessageSquare, Star, StarOff, Trash2 } from 'lucide-react';
import { useConversation } from '../context/ConversationContext';
import { formatRelativeTime } from '../utils/timeUtils';

const Sidebar = () => {
  const { 
    conversations, 
    currentConversationId, 
    setCurrentConversationId,
    rateConversation,
    deleteConversation
  } = useConversation();

  return (
    <div
      style={{
        width: '100%',
        height: 'calc(100vh - 64px)',
        overflowY: 'auto',
        backgroundColor: '#f9fafb', // gray-50
        borderRight: '1px solid #e5e7eb', // gray-200
      }}
    >
      <div style={{ padding: 16 }}>
        <h2
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: '#6b7280', // gray-500
            marginBottom: 12,
          }}
        >
          Chat History
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {conversations.map((conversation) => {
            const isActive = currentConversationId === conversation.id;
            return (
              <button
                key={conversation.id}
                onClick={() => setCurrentConversationId(conversation.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: isActive ? '#eff6ff' /* blue-50 */ : 'transparent',
                  color: isActive ? '#1d4ed8' /* blue-700 */ : '#374151' /* gray-700 */,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease, color 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.backgroundColor = '#f3f4f6'; // gray-100
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <MessageSquare style={{ width: 16, height: 16, marginTop: 4, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          margin: 0,
                        }}
                      >
                        {conversation.title}
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          color: '#6b7280', // gray-500
                          margin: 0,
                          marginTop: 2,
                        }}
                      >
                        {formatRelativeTime(conversation.timestamp)}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      flexShrink: 0,
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        rateConversation(
                          conversation.id, 
                          conversation.score === 1 ? 0 : 1
                        );
                      }}
                      aria-label={conversation.score === 1 ? "Unstar conversation" : "Star conversation"}
                      style={{
                        padding: 4,
                        color: conversation.score === 1 ? '#f59e0b' : '#9ca3af', // yellow-500 or gray-400
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'color 0.2s ease',
                        display: 'flex',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fbbf24'} // yellow-400
                      onMouseLeave={e => e.currentTarget.style.color = conversation.score === 1 ? '#f59e0b' : '#9ca3af'}
                    >
                      {conversation.score === 1 ? (
                        <Star style={{ width: 16, height: 16, fill: '#f59e0b', color: '#f59e0b' }} />
                      ) : (
                        <StarOff style={{ width: 16, height: 16 }} />
                      )}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conversation.id);
                      }}
                      aria-label="Delete conversation"
                      style={{
                        padding: 4,
                        color: '#9ca3af', // gray-400
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'color 0.2s ease',
                        display: 'flex',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#ef4444'} // red-500
                      onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
                    >
                      <Trash2 style={{ width: 16, height: 16 }} />
                    </button>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: '#6b7280', // gray-500
                    margin: 0,
                    marginTop: 4,
                  }}
                >
                  {conversation.messageCount} messages
                </p>
              </button>
            );
          })}

          {conversations.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                paddingTop: 32,
                paddingBottom: 32,
                color: '#6b7280', // gray-500
                fontSize: 14,
              }}
            >
              <p style={{ margin: 0 }}>No conversations yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
