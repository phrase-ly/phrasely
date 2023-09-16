"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyLanguageAction = exports.identifyLangugage = void 0;
const openai_1 = require("./openai");
const LANGID_PREFIX = [
    {
        role: "system",
        content: "Identify the language of this text and return a BCP-47 language code",
    },
    {
        role: "user",
        content: "Der Mauermörtel, also Mörtel zur Fertigung von Mauerwerk, unterscheidet sich in der heutigen Ausführung in wichtigen Anwendungseigenschaften vom Putzmörtel.ie Rezepturen und deren Eigenschaften auf den Anwendungszweck abgestimmt.",
    },
    {
        role: "assistant",
        content: "de",
    },
    {
        role: "user",
        content: "Hüt mogre bini i de Migros go poschte und ha ganz viel Orangesaft gchauft.",
    },
    {
        role: "assistant",
        content: "gsw",
    },
    {
        role: "user",
        content: "Supplemental insurance covers more benefits and offers extra comfort in hospital in the event of illness or accident. Compare benefits and premiums.",
    },
    {
        role: "assistant",
        content: "en",
    },
];
const identifyLangugage = async (text, openai) => {
    const messages = [
        ...LANGID_PREFIX,
        { role: "user", content: text },
    ];
    const { data } = await openai.post("chat/completions", {
        model: "gpt-3.5-turbo",
        messages,
    });
    return data.choices[0].message.content;
};
exports.identifyLangugage = identifyLangugage;
const identifyLanguageAction = async (input, options) => {
    const openai = (0, openai_1.getOpenAI)(options);
    try {
        const languageTag = await identifyLangugage(input.text, openai);
        popclip.showText(languageTag);
        popclip.showSuccess();
    }
    catch (e) {
        popclip.showText((0, openai_1.getErrorInfo)(e));
    }
    return null;
};
exports.identifyLanguageAction = identifyLanguageAction;
