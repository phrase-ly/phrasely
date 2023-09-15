"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const SUPPORTS_HTML = ["Microsoft Word"];
const generateImage = async (input, options) => {
    const openai = axios_1.default.create({
        baseURL: "https://api.openai.com/v1",
        headers: { Authorization: `Bearer ${options.apikey}` },
        timeout: 60000
    });
    // send the whole message history to OpenAI
    try {
        const response = await openai.post("/images/generations", {
            "prompt": input.text,
            "n": 1,
            "size": "256x256" // Todo move to options
        });
        const { data } = response;
        // popclip.showText(data.data[0].url, {preview: true})
        const imageHTML = `<img src=${data.data[0].url} alt=${input.text}/>`;
        const linkHTML = `<a href="${data.data[0].url}" >${input.text}</a>`;
        const appName = popclip.context.appName;
        popclip.showText(appName);
        if (SUPPORTS_HTML.includes(appName)) {
            popclip.pasteContent({ "public.html": imageHTML, "public.utf8-plain-text": input.text });
        }
        else {
            popclip.pasteContent({ "public.html": linkHTML, "public.utf8-plain-text": input.text });
        }
        popclip.showSuccess();
    }
    catch (e) {
        // @ts-ignore
        popclip.showText(e.toString());
    }
    return null;
};
exports.default = generateImage;
