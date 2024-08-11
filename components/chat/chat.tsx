import { useState } from "react";
import { ChatList } from "./chat-list";
import { customerSupportPrompt } from "@/lib/langchain";
import ChatTopbar from "./chat-topbar";
import axios from "axios";

interface ChatProps {
  messages?: any[];
  isMobile: boolean;
}

export function Chat({ isMobile }: ChatProps) {
  const [messagesState, setMessages] = useState<any[]>([]);
  const [loadingResponse, setLoadingResponse] = useState(false);

  const sendMessage = async (newMessage: any) => {
    setMessages((prevMessage) => [...prevMessage, newMessage]);

    try {
      setLoadingResponse(true);
      const response = await axios.post("/api/chatbot", { newMessage });

    console.log("response from frotnend", response.data.response);

      const aiMessage = {
        id: messagesState.length + 1,
        name: "AI Customer Support",
        avatar: "",
        message: response.data.response,
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setLoadingResponse(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected Error:", error);
      }
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
