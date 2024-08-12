import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";

import "cheerio";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

const llm = new ChatGoogleGenerativeAI({
  apiKey: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
  temperature: 0.7,
  model: "gemini-1.5-pro-latest",
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

const webUrls = [
  "https://www.apple.com/ng/iphone-15/specs/",
    "https://www.apple.com/ng/iphone-15/",
];

const loadDocumentsFromUrls = async (urls: string[]) => {
  const loaders = urls.map((url) => new CheerioWebBaseLoader(url));
  const docs = [];

  for (const loader of loaders) {
    const loadedDocs = await loader.load();
    docs.push(...loadedDocs);
  }

  return docs;
};

export const customerSupportPrompt = async (question: string) => {
  const docs = await loadDocumentsFromUrls(webUrls);

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const splits = await textSplitter.splitDocuments(docs);
  const vectorStore = await MemoryVectorStore.fromDocuments(
    splits,
    new GoogleGenerativeAIEmbeddings({
      apiKey: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
    })
  );

  // Retrieve and generate using the relevant snippets of the site.
  const retriever = vectorStore.asRetriever();

  const prompt = ChatPromptTemplate.fromMessages([
    HumanMessagePromptTemplate.fromTemplate(
      `You are a customer support AI for {companyName}. A customer has asked the following question:

      "{question}"

      Here is some context that may help you answer the question:
      
      {context}

      Please provide a helpful, polite, and concise response. Make sure your response is accurate and directly addresses the customer's concern. If there is an image in the response, return it as a link.

      If the question cannot be answered with the provided information, suggest the customer reach out to human support for further assistance.`
    ),
  ]);

  try {
    const retrievedDocs = await retriever.invoke(question);
    console.log("retireved docs", retrievedDocs);

    if (!Array.isArray(retrievedDocs)) {
      throw new Error(
        "Retrieved documents are not in the expected array format."
      );
    }

    if (retrievedDocs.length === 0) {
      throw new Error("No documents retrieved for the query.");
    }

    // Check if each document has the expected 'pageContent' property
    const missingPageContent = retrievedDocs.filter((doc) => !doc.pageContent);
    if (missingPageContent.length > 0) {
      throw new Error("Some documents are missing the 'pageContent' property.");
    }

    const ragChain = await createStuffDocumentsChain({
      llm,
      prompt,
      outputParser: new StringOutputParser(),
    });

    const response = await ragChain.invoke({
      question: question,
      context: retrievedDocs,
      companyName: "Apple",
    });

    return response;
  } catch (error) {
    console.error("Error analyzing mood:", error);
    throw error;
  }
};
