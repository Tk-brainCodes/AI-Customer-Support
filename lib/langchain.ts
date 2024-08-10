import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import {
  ChatPromptTemplate,
  FewShotChatMessagePromptTemplate,
} from "@langchain/core/prompts";

const model = new ChatGoogleGenerativeAI({
  apiKey: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
  temperature: 0.7,
  model: "gemini-1.5-flash",
  maxOutputTokens: 8192,
  topK: 64,
  topP: 0.95,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ],
});

export const customerSupportPrompt = async (
  customerQuery: string,
  companyName: string,
  productDetails: string
) => {
  const prompt = `
    You are a customer support AI for ${companyName}. A customer has asked the following question:

    "${customerQuery}"

    Please provide a helpful, polite, and concise response. Make sure your response is accurate and directly addresses the customer's concern. If the query is related to a specific product, provide relevant details from the product information below:

    Product Details:
    ${productDetails}

    If the question cannot be answered with the provided information, suggest the customer reach out to human support for further assistance.

    Here is the customer support number: 222-222-333
    And here is the email: techNestSolution@gmail.com
  `;
  try {
    const res = await model.invoke(prompt);
    return res.content;
  } catch (error) {
    console.error("Error analyzing mood:", error);
    throw error;
  }
};
