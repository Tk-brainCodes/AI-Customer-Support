import { customerSupportPrompt } from "@/lib/langchain";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const { question } = await req.json();

    
    const response = await customerSupportPrompt(question);
    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Error in chatbot API:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
}
