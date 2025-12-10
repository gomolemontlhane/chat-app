import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col h-full">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />

      {/* SIMPLIFIED: Remove all flex/overflow classes from container */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === authUser._id;
          
          return (
            // KEY: Make sure this div has NO conflicting classes
            <div
              key={message._id}
              className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}
            >
              {/* Avatar */}
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      isOwnMessage
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="avatar"
                  />
                </div>
              </div>
              
              {/* Message bubble - SIMPLIFIED */}
              <div className="chat-bubble bg-base-300">
                {message.text}
              </div>
              
              {/* Timestamp */}
              <div className="chat-footer opacity-50">
                {formatMessageTime(message.createdAt)}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;