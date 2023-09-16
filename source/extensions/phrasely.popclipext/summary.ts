import { ChatMessage, ChatResponse, getErrorInfo, getOpenAI } from "./openai";

const SUMMARIZE_PREFIX: ChatMessage = {
  role: "system",
  content: "Summarize this text in a single sentence",
};

export const summarize: ActionFunction = async (input, options) => {
  const openai = getOpenAI(options);
  try {
    const messages: ChatMessage[] = [
      SUMMARIZE_PREFIX,
      { role: "user", content: input.text },
    ];
    const { data }: ChatResponse = await openai.post("chat/completions", {
      model: "gpt-3.5-turbo",
      messages,
    });

    const summary = data.choices[0].message.content;
    popclip.pasteText(summary);
    popclip.showSuccess();
  } catch (e) {
    popclip.showText(getErrorInfo(e));
  }
  return null;
};
