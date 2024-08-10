import { useState } from "react";
import { ChatList } from "./chat-list";
import { customerSupportPrompt } from "@/lib/langchain";
import { product_details } from "@/types/product-details";
import ChatTopbar from "./chat-topbar";

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
      const response = await customerSupportPrompt(
        newMessage.message,
        "TechNest Solutions",
        JSON.stringify(product_details)
      );

      const aiMessage = {
        id: messagesState.length + 1,
        name: "AI Customer Support",
        avatar: "",
        message: response,
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
