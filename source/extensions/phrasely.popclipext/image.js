"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImage = void 0;
const axios_1 = require("axios");
const voca_1 = require("voca");
const openai_1 = require("./openai");
const SUPPORTS_IMG_HTML = ["Microsoft Word"];
const SUPPORTS_A_HTML = ["Slack"];
const generateImage = async (input, options) => {
    const openai = (0, openai_1.getOpenAI)(options);
    try {
        const response = await openai.post("/images/generations", {
            prompt: input.text,
            n: 1,
            size: "256x256", // Todo move to options
        });
        const imageUrl = response.data.data[0].url;
        // popclip.showText(data.data[0].url, {preview: true})
        const imageHTML = `<img src=${imageUrl} alt=${input.text}/>`;
        const linkHTML = `<a href="${imageUrl}" >${input.text}</a>`;
        const appName = popclip.context.appName;
        popclip.showText(appName);
        if (SUPPORTS_IMG_HTML.includes(appName)) {
            popclip.pasteContent({
                "public.html": imageHTML,
                "public.utf8-plain-text": input.text,
            });
        }
        else if (SUPPORTS_A_HTML.includes(appName)) {
            popclip.pasteContent({
                "public.html": linkHTML,
                "public.utf8-plain-text": input.text,
            });
        }
        else {
            const tinyurlResponse = await axios_1.default.post("https://api.tinyurl.com/create", {
                url: imageUrl,
                alias: (0, voca_1.slugify)(input.text),
            }, {
                headers: {
                    Authorization: `Bearer 3R49Hxa3n6mXENJy3HK3bvZSk2JrsZ4VN0sgi5u9g7xWI4eRnvNX8nIclpcb`,
                },
            });
            const shortUrl = tinyurlResponse.data.data.tiny_url;
            popclip.pasteText(shortUrl);
        }
        popclip.showSuccess();
    }
    catch (e) {
        popclip.showText((0, openai_1.getErrorInfo)(e));
    }
    return null;
};
exports.generateImage = generateImage;
