import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

/**
 * ChatContainer Component
 * 
 * The main chat interface component that displays:
 * 1. Chat header with user information
 * 2. List of messages between the current user and selected user
 * 3. Message input area for sending new messages
 * 
 * Features:
 * - Fetches and displays message history for the selected user
 * - Subscribes to real-time message updates
 * - Automatically scrolls to the latest message
 * - Shows loading skeleton while fetching messages
 * - Displays images and text messages with proper formatting
 * - Differentiates between user's own messages and received messages
 * 
 * Dependencies:
 * - useChatStore: For message state and operations
 * - useAuthStore: For authenticated user information
 * - formatMessageTime: Utility for formatting timestamps
 * 
 * Usage:
 * <ChatContainer />
 */
const ChatContainer = () => {
  /**
   * Chat Store
   * Contains:
   * - messages: Array of message objects in the current chat
   * - getMessages: Function to fetch messages for a specific user
   * - isMessagesLoading: Boolean indicating if messages are being loaded
   * - selectedUser: The user currently being chatted with
   * - subscribeToMessages: Function to set up real-time message updates
   * - unsubscribeFromMessages: Function to clean up real-time subscriptions
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
   * Auth Store
   * Contains:
   * - authUser: Current authenticated user's information
   */
  const { authUser } = useAuthStore();

  /**
   * messageEndRef: React ref attached to the last message element
   * Used to automatically scroll to the bottom of the chat when new messages arrive
   */
  const messageEndRef = useRef(null);

  /**
   * Effect Hook 1: Message Subscription
   * 
   * Purpose: Fetch initial messages and set up real-time message subscription
   * Trigger: When selectedUser._id changes (user selects a different chat)
   * 
   * Actions:
   * 1. Fetches existing messages for the selected user
   * 2. Subscribes to real-time message updates
   * 3. Returns cleanup function to unsubscribe when component unmounts or user changes
   * 
   * Cleanup: Prevents memory leaks by unsubscribing from real-time updates
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
   * 
   * Purpose: Keep the chat view scrolled to the latest message
   * Trigger: When messages array changes (new messages arrive or initial load)
   * 
   * Note: Uses smooth scrolling for better user experience
   */
  useEffect(() => {
    // Only scroll if we have messages and the ref is available
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  /**
   * Loading State
   * Displays skeleton UI while messages are being fetched
   * Maintains the same layout structure for smooth transitions
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
   * 
   * Structure:
   * 1. Container with flex layout for proper message display
   * 2. ChatHeader component at the top
   * 3. Scrollable message list area
   * 4. MessageInput component at the bottom
   */
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {/* Chat header with user info and actions */}
      <ChatHeader />

      {/* Message list container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          /**
           * Individual Message Bubble
           * 
           * Styling based on sender:
           * - "chat-end": Messages sent by current user (aligned right)
           * - "chat-start": Messages received from selected user (aligned left)
           * 
           * Note: Each message has:
           * - Unique key for React optimization
           * - Ref attached to last message for auto-scrolling
           */
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            {/* Profile picture container */}
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    // Display appropriate profile picture based on sender
                    message.senderId === authUser._id
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
              {message.text && <p>{message.text} and jesus</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Message input area for typing and sending new messages */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;