import generateImage from "./image";
import { summarize } from "./summary";
import { identifyLanguageAction } from "./langid";

// export the actions
export const actions: Action[] = [
  {
    title: "Generate Image",
    code: generateImage,
    icon: "image.svg",
  },
  {
    title: "Summarize",
    code: summarize,
    icon: "summary.svg",
  },
  {
    title: "Identify Lanuggae",
    code: identifyLanguageAction,
    icon: "langid.svg",
  },
];
