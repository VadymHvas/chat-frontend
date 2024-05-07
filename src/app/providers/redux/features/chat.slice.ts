import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatState, Message } from "../interfaces/chat.state.interface";

const initialState: ChatState = {
  currentChat: "",
  messages: []
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChat: (state, action: PayloadAction<string>) => {
      state.currentChat = action.payload;
    },

    setMessages: (state, action: PayloadAction<Message>) => {
      state.messages = [...state.messages, action.payload];
    }
  }
});

export default chatSlice.reducer;
export const { setCurrentChat, setMessages } = chatSlice.actions;