import { customerSupportPrompt } from "@/lib/langchain";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    console.log("questions coming from the frontend", question)
    const response = await customerSupportPrompt(question);

    return NextResponse.json(response); 
  } catch (error: any) {
    console.error("Error in chatbot API:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
