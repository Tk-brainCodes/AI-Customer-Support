import { useState } from "react";
import { ChatList } from "./chat-list";
import { Message } from "@/types/data";
import ChatTopbar from "./chat-topbar";
import axios from "axios";

interface ChatProps {
  messages?: any[];
  isMobile: boolean;
}

export function Chat({ isMobile }: ChatProps) {
  const [messagesState, setMessages] = useState<any[]>([]);
  const [loadingResponse, setLoadingResponse] = useState(false);

  const sendMessage = async (newMessage: Message) => {
    setMessages((prevMessage) => [...prevMessage, newMessage]);

    try {
      setLoadingResponse(true);
      const response = await axios.post("/api/chatbot", {
        question: newMessage.message,
      });

      const aiMessage = {
        id: messagesState.length + 1,
        name: "AI Customer Support",
        avatar: "",
        message: response.data,
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setLoadingResponse(false);
    } catch (error) {
      console.log("failed to generate", error);
    }
  };

  console.log("message array:", messagesState);

  return (
    <div className='flex flex-col justify-between w-[50vw] h-[90vh] border'>
      <ChatTopbar />
      <ChatList
        messages={messagesState}
        sendMessage={sendMessage}
        isMobile={isMobile}
        loading={loadingResponse}
      />
    </div>
  );
}
