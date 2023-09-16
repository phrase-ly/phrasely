import axios from "axios";

const getOpenAI = (options) =>
  axios.create({
    baseURL: "https://api.openai.com/v1",
    headers: { Authorization: `Bearer ${options.apikey}` },
    timeout: 60_000,
  });

// Types for image generation
interface Image {
  url: string;
}

interface ImageResponseData {
  created: Number;
  data: Image[];
}

interface ImageResponse {
  data: ImageResponseData;
}

// Types for chat completion
interface ChatMessage {
  role: "user" | "system" | "assistant";
  content: string;
}
interface ChatResponseData {
  choices: [
    {
      message: ChatMessage;
    }
  ];
}
interface ChatResponse {
  data: ChatResponseData;
}
const getErrorInfo = (error: unknown): string => {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as any).response;
    //return JSON.stringify(response);
    return `Message from OpenAI (code ${response.status}): ${response.data.error.message}`;
  } else {
    return String(error);
  }
};

export {
  getOpenAI,
  Image,
  ImageResponse,
  ChatMessage,
  ChatResponse,
  getErrorInfo,
};
