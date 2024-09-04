export interface Messages {
  message: string;
  id: number;
  autor: { id: number; username: string };
  time: string;
}

export interface Conversations {
  name: string;
  id: number;
  time?: string;
}

export interface StateChatConversation {
  id: number;
  asunto: string | JSX.Element[] | JSX.Element;
}
