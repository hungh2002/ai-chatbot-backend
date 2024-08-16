import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiAPI = async (chatHistory) => {
  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const chat = model.startChat({
    history: chatHistory,
    generationConfig: {
      maxOutputTokens: 30,
    },
  });

  const text = chatHistory[chatHistory.length - 1].parts[0].text;
  const result = await chat.sendMessage(text);
  const response = await result.response;
  return response.text();
};

export default geminiAPI;
