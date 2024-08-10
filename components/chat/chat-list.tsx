import { Message } from "@/types/data";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import ChatBottombar from "./chat-bottombar";
import { AnimatePresence, motion } from "framer-motion";

interface ChatListProps {
  messages?: Message[];
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
  loading: boolean;
}

export function ChatList({
  messages,
  sendMessage,
  isMobile,
  loading,
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  console.log("messages from chatlist", messages);

  return (
    <div className='w-full overflow-y-auto overflow-x-hidden h-full flex flex-col'>
      <div
        ref={messagesContainerRef}
        className='w-full overflow-y-auto overflow-x-hidden h-full flex flex-col'
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap items-end",
                message.name == "Customer" ? "items-end" : "items-start"
              )}
            >
              <div className='flex gap-3 items-center'>
                {message.name === "AI Customer Support" && (
                  <Avatar className='flex justify-center items-center'>
                    <AvatarImage
                      src='../../assets/robot.png'
                      alt='robot'
                      width={6}
                      height={6}
                    />
                    <AvatarFallback className='bg-rose-300'>AI</AvatarFallback>
                  </Avatar>
                )}

                <span className=' bg-accent p-3 rounded-md max-w-xs'>
                  <ReactMarkdown>{message.message}</ReactMarkdown>
                  {message.name === "Customer" && loading ? (
                    <div className='chat-bubble'>
                      <div className='typing'>
                        <div className='dot'></div>
                        <div className='dot'></div>
                        <div className='dot'></div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </span>
                {message.name !== "AI Customer Support" && (
                  <Avatar className='flex justify-center items-center'>
                    <AvatarImage
                      src={message.avatar}
                      alt={message.name}
                      width={6}
                      height={6}
                    />
                    <AvatarFallback className='bg-green-300'>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottombar sendMessage={sendMessage} isMobile={isMobile} />
    </div>
  );
}
