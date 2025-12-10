import { useEffect, useRef, useCallback } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";

/**
 * ChatContainer Component
 * 
 * Main chat interface component that displays:
 * - Chat header with selected user info
 * - Message history with auto-scrolling
 * - Real-time message subscription
 * - Message input for sending new messages
 * 
 * Features:
 * - Real-time message updates via WebSocket/subscription
 * - Auto-scroll to latest message
 * - Loading states with skeletons
 * - Image attachment display
 * - Message timestamp formatting
 * 
 * @returns {JSX.Element} The chat interface container
 */
const ChatContainer = (): JSX.Element => {
  // Store hooks
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  
  const { authUser } = useAuthStore();
  
  // Refs
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  /**
   * Scrolls to the latest message in the chat
   * Triggered when messages array changes
   */
  const scrollToLatestMessage = useCallback((): void => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "end" 
      });
    }
  }, [messages.length]);
  
  /**
   * Effect: Fetch messages and subscribe to real-time updates
   * Cleans up subscription when component unmounts or selected user changes
   */
  useEffect(() => {
    if (!selectedUser?._id) return;
    
    // Fetch existing messages for selected user
    getMessages(selectedUser._id);
    
    // Subscribe to real-time message updates
    subscribeToMessages();
    
    // Cleanup: Unsubscribe from real-time updates
    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);
  
  /**
   * Effect: Auto-scroll to latest message when messages update
   */
  useEffect(() => {
    scrollToLatestMessage();
  }, [messages, scrollToLatestMessage]);
  
  /**
   * Determines if a message was sent by the authenticated user
   * 
   * @param {string} senderId - The sender's ID from the message
   * @returns {boolean} True if message is from auth user
   */
  const isOwnMessage = useCallback((senderId: string): boolean => {
    return senderId === authUser._id;
  }, [authUser._id]);
  
  /**
   * Gets the profile picture URL for a message sender
   * 
   * @param {string} senderId - The sender's ID from the message
   * @returns {string} Profile picture URL
   */
  const getProfilePic = useCallback((senderId: string): string => {
    if (isOwnMessage(senderId)) {
      return authUser.profilePic || "/avatar.png";
    }
    return selectedUser.profilePic || "/avatar.png";
  }, [isOwnMessage, authUser.profilePic, selectedUser.profilePic]);
  
  // Loading state
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  
  // No user selected state
  if (!selectedUser?._id) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-base-200 p-4">
        <div className="text-center">
          <div className="text-5xl mb-4">👋</div>
          <h2 className="text-2xl font-semibold mb-2">Welcome to Chat</h2>
          <p className="text-base-content/70">
            Select a conversation from the sidebar to start messaging
          </p>
        </div>
      </div>
    );
  }
  
  // Empty chat state
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatHeader />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="text-center">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">
              Start a conversation with {selectedUser.fullName}
            </h3>
            <p className="text-base-content/70">
              Send your first message to get started
            </p>
          </div>
        </div>
        <MessageInput />
      </div>
    );
  }
  
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-base-100">
      {/* Chat Header */}
      <ChatHeader />
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message, index) => {
          const ownMessage = isOwnMessage(message.senderId);
          
          return (
            <div
              key={message._id}
              className={`chat ${ownMessage ? "chat-end" : "chat-start"} ${
                index === messages.length - 1 ? "mb-2" : ""
              }`}
            >
              {/* Profile Avatar */}
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border border-base-300">
                  <img
                    src={getProfilePic(message.senderId)}
                    alt={`${ownMessage ? "Your" : selectedUser.fullName + "'s"} profile`}
                    className="object-cover"
                    onError={(e) => {
                      // Fallback to default avatar if image fails to load
                      e.currentTarget.src = "/avatar.png";
                    }}
                  />
                </div>
              </div>
              
              {/* Message Timestamp */}
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              
              {/* Message Content */}
              <div className={`chat-bubble ${ownMessage ? "chat-bubble-primary" : "chat-bubble-secondary"}`}>
                {/* Image Attachment */}
                {message.image && (
                  <img
                    src={message.image}
                    alt="Message attachment"
                    className="sm:max-w-[200px] rounded-md mb-2 border border-base-300"
                    loading="lazy"
                  />
                )}
                
                {/* Message Text */}
                {message.text && (
                  <p className="whitespace-pre-wrap break-words">{message.text}</p>
                )}
              </div>
              
              {/* Message Status Indicator (Optional - for own messages) */}
              {ownMessage && (
                <div className="chat-footer opacity-70 mt-1">
                  <div className="text-xs">
                    {message.isRead ? "Read" : "Delivered"}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        
        {/* Scroll anchor for auto-scrolling */}
        <div ref={messageEndRef} aria-hidden="true" />
      </div>
      
      {/* Message Input */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;