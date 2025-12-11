import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

/**
 * ChatContainer Component
 * * Corrected Features:
 * 1. Scrolling: messageEndRef is now correctly applied ONLY to the last message.
 * 2. Styling: Sender ID comparison now includes String() conversion for type safety, 
 * ensuring the "chat-start" (received) and "chat-end" (sent) styles are correct.
 */
const ChatContainer = () => {
  /**
   * Chat Store (State and Actions)
   */
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  /**
   * Auth Store (Current User Info)
   */
  const { authUser } = useAuthStore();

  /**
   * messageEndRef: React ref attached to the last message element
   * Used to automatically scroll to the bottom of the chat.
   */
  const messageEndRef = useRef(null);

  /**
   * Effect Hook 1: Message Subscription and Initial Fetch
   */
  useEffect(() => {
    // Fetch messages for the selected user
    getMessages(selectedUser._id);

    // Subscribe to real-time message updates
    subscribeToMessages();

    // Cleanup function: unsubscribe when component unmounts or user changes
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  /**
   * Effect Hook 2: Auto-scroll to Latest Message
   */
  useEffect(() => {
    // Only scroll if we have messages and the ref is available
    if (messageEndRef.current && messages && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  /**
   * Loading State
   */
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  /**
   * Main Chat UI
   */
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {/* Chat header with user info and actions */}
      <ChatHeader />

      {/* Message list container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Display message if chat is empty */}
        {messages.length === 0 && (
            <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Start a conversation!</p>
            </div>
        )}

        {/* Map through messages */}
        {messages.map((message, index) => {
          
          // Determine if this is the last message for conditional ref application
          const isLastMessage = index === messages.length - 1;

          /**
           * FIX: Use String() conversion for robust comparison.
           * This handles cases where IDs might be stored as different types (e.g., 
           * MongoDB ObjectId object vs. string).
           */
          const isMyMessage = String(message.senderId) === String(authUser._id);
          
          return (
            <div
              key={message._id}
              // Styling based on the fixed comparison
              className={`chat ${isMyMessage ? "chat-end" : "chat-start"}`}
              // Ref applied ONLY to the last message
              ref={isLastMessage ? messageEndRef : null} 
            >
              {/* Profile picture container */}
              <div className=" chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      // Display appropriate profile picture based on sender
                      isMyMessage
                        ? authUser.profilePic || "/avatar.png"  // Current user's profile
                        : selectedUser.profilePic || "/avatar.png"  // Selected user's profile
                    }
                    alt="profile pic"
                  />
                </div>
              </div>

              {/* Message timestamp */}
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              {/* Message content bubble */}
              <div className="chat-bubble flex flex-col">
                {/* Image attachment (if present) */}
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}

                {/* Message text (if present) */}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Message input area for typing and sending new messages */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;