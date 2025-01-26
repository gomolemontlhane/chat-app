import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      
      // Avoid adding duplicate messages by checking message IDs
      const isMessageDuplicate = messages.some(msg => msg._id === res.data._id);
      if (!isMessageDuplicate) {
        set({ messages: [...messages, res.data] });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    
    if (socket?.connected) {
      socket.on("newMessage", (newMessage) => {
        // Ensure the new message is from the selected user
        if (newMessage.senderId === selectedUser._id) {
          set({
            messages: [...get().messages, newMessage],
          });
        }
      });
    }
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket?.connected) {
      socket.off("newMessage");
    }
  },

  setSelectedUser: (selectedUser) => {
    // Unsubscribe from the previous user's messages and subscribe to the new user
    get().unsubscribeFromMessages();
    set({ selectedUser });
    get().subscribeToMessages();
  },
}));
