import { customerSupportPrompt } from "@/lib/langchain";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { question } = req.body;
    const response = await customerSupportPrompt(question);
    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Error in chatbot API:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
}
