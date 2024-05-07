export interface Message {
  name: string;
  message: string;
}

export interface ChatState {
  currentChat: string;
  messages: Message[];
}