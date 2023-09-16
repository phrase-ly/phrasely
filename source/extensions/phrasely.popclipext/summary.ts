import { ChatMessage, ChatResponse, getErrorInfo, getOpenAI } from "./openai";
import { identifyLangugage } from "./langid";

const SUMMARIZE_PREFIX_EN: ChatMessage = {
  role: "system",
  content:
    "Summarize the following text in three short bullet points with a maximum of 10 words each",
};

const SUMMARIZE_PREFIX_DE: ChatMessage = {
  role: "system",
  content:
    "Schreibe eine sehr kurze Zusammenfassung für den folgenden Text mit drei Bullet Points und maximal 10 Wörtern",
};

export const summarize: ActionFunction = async (input, options) => {
  const openai = getOpenAI(options);
  const text = input.text;

  const languageTag = await identifyLangugage(text, openai);
  const SUMMARIZE_PREFIX = languageTag === "de" ? SUMMARIZE_PREFIX_DE : SUMMARIZE_PREFIX_EN;
  
  try {
    const messages: ChatMessage[] = [
      SUMMARIZE_PREFIX,
      { role: "user", content: input.text },
    ];
    const { data }: ChatResponse = await openai.post("chat/completions", {
      model: options.model,
      messages,
    });

    const summary = data.choices[0].message.content;
    popclip.showText(summary, { preview: true });
    popclip.showSuccess();
  } catch (e) {
    popclip.showText(getErrorInfo(e));
  }
  return null;
};
