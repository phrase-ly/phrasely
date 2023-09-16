import { ChatMessage, ChatResponse, getErrorInfo, getOpenAI } from "./openai";

const LANGID_PREFIX: ChatMessage[] = [
  {
    role: "system",
    content:
      "Identify the language of this text and return a BCP-47 language code",
  },
  {
    role: "user",
    content:
      "Der Mauermörtel, also Mörtel zur Fertigung von Mauerwerk, unterscheidet sich in der heutigen Ausführung in wichtigen Anwendungseigenschaften vom Putzmörtel.ie Rezepturen und deren Eigenschaften auf den Anwendungszweck abgestimmt.",
  },
  {
    role: "assistant",
    content: "de",
  },
  {
    role: "user",
    content:
      "Hüt morge bini i de Migros go poschte und ha ganz viel Orangesaft gchauft.",
  },
  {
    role: "assistant",
    content: "gsw",
  },
  {
    role: "user",
    content:
      "Supplemental insurance covers more benefits and offers extra comfort in hospital in the event of illness or accident. Compare benefits and premiums.",
  },
  {
    role: "assistant",
    content: "en",
  },
];

const identifyLangugage = async (text, openai) => {
  const messages: ChatMessage[] = [
    ...LANGID_PREFIX,
    { role: "user", content: text },
  ];
  const { data }: ChatResponse = await openai.post("chat/completions", {
    model: "gpt-3.5-turbo",
    messages,
  });

  return data.choices[0].message.content;
};

const identifyLanguageAction: ActionFunction = async (input, options) => {
  const openai = getOpenAI(options);
  try {
    const languageTag = await identifyLangugage(input.text, openai);
    popclip.showText(languageTag);
    popclip.showSuccess();
  } catch (e) {
    popclip.showText(getErrorInfo(e));
  }
  return null;
};

export { identifyLangugage, identifyLanguageAction };
