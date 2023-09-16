import generateImage from "./image";
import {summarize} from "./summary";

// export the actions
export const actions: Action[] = [
  {
    title: "Generate Image",
    code: generateImage,
    icon: "image.svg",
  },
  {
    title: "ChatGPT: Chat",
    code: summarize,
    icon: "summary.svg"
  },  
];
