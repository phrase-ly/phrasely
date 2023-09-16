"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarize = void 0;
const openai_1 = require("./openai");
const SUMMARIZE_PREFIX = {
    role: "system",
    content: "Summarize this text in the same language in less than 100 characters.",
};
const summarize = async (input, options) => {
    const openai = (0, openai_1.getOpenAI)(options);
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
        popclip.pasteText(summary);
        popclip.showSuccess();
    }
    catch (e) {
        popclip.showText((0, openai_1.getErrorInfo)(e));
    }
    return null;
};
exports.summarize = summarize;
