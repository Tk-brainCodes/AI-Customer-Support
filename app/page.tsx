import { cookies } from "next/headers";
import { ChatLayout } from "@/components/chat/chat-layout";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return (
    <main className='flex h-[calc(100dvh)] flex-col items-center justify-center p-4 md:px-24 py-32 gap-4'>
      {/* <div className='mt-1 flex items-center justify-between'>
        <h1 className='text-2xl text-slate-800'>Chatbot</h1>
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div> */}
      <div className='z-10 flex flex-col items-center justify-center rounded-lg max-w-5xl w-full h-full text-sm lg:flex'>
        <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
      </div>
    </main>
  );
}
