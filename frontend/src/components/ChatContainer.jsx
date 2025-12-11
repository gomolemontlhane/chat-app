import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

/**
 * ChatContainer Component
 * * The main chat interface component that displays:
 * 1. Chat header with user information
 * 2. List of messages between the current user and selected user
 * 3. Message input area for sending new messages
 * * FIX APPLIED: The messageEndRef is now only applied to the last message 
 * in the list to correctly enable auto-scrolling to the bottom.
 */
const ChatContainer = () => {
  /**
   * Chat Store
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
   */
  const { authUser } = useAuthStore();

  /**
   * messageEndRef: React ref attached ONLY to the last message element
   * Used to automatically scroll to the bottom of the chat.
   */
  const messageEndRef = useRef(null);

  /**
   * Effect Hook 1: Message Subscription
   * Fetches initial messages and sets up real-time message subscription.
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
   * Scrolls to the element pointed to by messageEndRef whenever the messages array changes.
   */
  useEffect(() => {
    // Only scroll if we have messages and the ref is available
    if (messageEndRef.current && messages && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  /**
   * Loading State
   * Displays skeleton UI while messages are being fetched.
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
        {/* Check if there are no messages */}
        {messages.length === 0 && (
            <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Start a conversation!</p>
            </div>
        )}

        {/* Map through messages and render chat bubbles */}
        {messages.map((message, index) => { // <-- Use index for conditional ref
            
          // Check if the current message is the very last one
          const isLastMessage = index === messages.length - 1;

          return (
            /**
             * Individual Message Bubble
             * * Styling based on sender:
             * - "chat-end": Messages sent by current user (aligned right)
             * - "chat-start": Messages received from selected user (aligned left)
             * * Ref is CONDITIONALLY attached to the last message only (isLastMessage ? messageEndRef : null)
             */
            <div
              key={message._id}
              className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              // **FIX HERE:** Only apply the ref to the last message for scrolling
              ref={isLastMessage ? messageEndRef : null} 
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