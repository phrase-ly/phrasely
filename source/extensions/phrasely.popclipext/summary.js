"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarize = void 0;
const openai_1 = require("./openai");
const langid_1 = require("./langid");
const SUMMARIZE_PREFIX_EN = {
    role: "system",
    content: "Summarize the following text in three short bullet points with a maximum of 10 words each",
};
const SUMMARIZE_PREFIX_DE = {
    role: "system",
    content: "Schreibe eine sehr kurze Zusammenfassung für den folgenden Text mit drei Bullet Points und maximal 10 Wörtern",
};
const summarize = async (input, options) => {
    const openai = (0, openai_1.getOpenAI)(options);
    const text = input.text;
    const languageTag = await (0, langid_1.identifyLangugage)(text, openai);
    const SUMMARIZE_PREFIX = languageTag === "de" ? SUMMARIZE_PREFIX_DE : SUMMARIZE_PREFIX_EN;
    try {
        const messages = [
            SUMMARIZE_PREFIX,
            { role: "user", content: input.text },
        ];
        const { data } = await openai.post("chat/completions", {
            model: options.model,
            messages,
        });
        const summary = data.choices[0].message.content;
        popclip.showText(summary, { preview: true });
        popclip.showSuccess();
    }
    catch (e) {
        popclip.showText((0, openai_1.getErrorInfo)(e));
    }
    return null;
};
exports.summarize = summarize;
