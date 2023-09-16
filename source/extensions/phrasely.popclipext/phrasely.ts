import generateImage from "./image";
import chat from "./summary";

// export the actions
export const actions: Action[] = [
  {
    title: "Generate Image",
    code: generateImage,
    icon: "image.svg",
  },
  {
    title: "ChatGPT: Chat",
    code: chat,
    icon: "summary.svg",
  },
];
