import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React from "react";

interface ChatProps {
  messages?: any[];
  isMobile: boolean;
}

export function Chat({ isMobile }: ChatProps) {
  const [messagesState, setMessages] = React.useState<any[]>([]);

  const sendMessage = (newMessage: any) => {
    setMessages([...messagesState, newMessage]);
  };

  console.log("message array:", messagesState);

  return (
    <div className='flex flex-col justify-between w-full h-full'>
      <ChatTopbar />

      <ChatList
        messages={messagesState}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
