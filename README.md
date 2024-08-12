# AI RAG Customer Support Chatbot

This project is an AI-powered customer support chatbot built using React and RAG (Retrieval-Augmented Generation). It features a chat interface where users can interact with an AI support agent that provides responses based on user queries and company-specific information.

## Features

- **Real-time Chat**: Users can send messages and receive real-time responses from the AI.
- **Dynamic AI Responses**: The AI generates responses based on user queries, leveraging retrieval-augmented generation for enhanced accuracy.
- **Responsive Design**: The chat interface adapts to both mobile and desktop views.
- **Animation**: Smooth animations for chat messages using `framer-motion`.

## Technologies

- **Nextjs**: Robust frontend framework for client-side and server-side.
- **RAG (Retrieval-Augmented Generation)**: For enhanced AI responses based on retrieval from a knowledge base.
- **Framer Motion**: For animations.
- **TypeScript**: For type safety.
- **Tailwind CSS**: For styling.

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Tk-brainCodes/AI-Customer-Support.git
    cd ai-customer-support-chatbot
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add the following:

    ```env
    NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key_here
    ```

4. **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

1. **Sending Messages:**

   Users can type messages into the chat input and press Enter to send. The AI will generate a response based on the message content and the company's product details.

2. **Customizing the Chatbot:**

   - **Company Name and Product Details:** Update the `customerSupportPrompt` function in `lib/langchain.ts` to match your company's information.
   - **AI Model Configuration:** Adjust the RAG model settings in `lib/langchain.ts` as needed.

## Contributing

1. **Fork the repository**
2. **Create a new branch**: `git checkout -b feature/your-feature`
3. **Commit your changes**: `git commit -am 'Add new feature'`
4. **Push to the branch**: `git push origin feature/your-feature`
5. **Create a new Pull Request**

## Acknowledgements

- [RAG (Retrieval-Augmented Generation)](https://huggingface.co/transformers/model_doc/rag.html) for providing advanced AI capabilities.
- [Framer Motion](https://www.framer.com/api/motion/) for smooth animations.
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
