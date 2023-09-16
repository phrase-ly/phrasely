import axios from "axios";
import { slugify } from "voca";
import { getErrorInfo, getOpenAI, ImageResponse } from "./openai";

const SUPPORTS_IMG_HTML = ["Microsoft Word", "Firefox"];
const SUPPORTS_A_HTML = ["Slack"];

const generateImage: ActionFunction = async (input, options) => {
  const openai = getOpenAI(options);
  try {
    const response: ImageResponse = await openai.post("/images/generations", {
      prompt: input.text,
      n: 1, // Todo move to options
      size: "256x256", // Todo move to options
    });

    const imageUrl = response.data.data[0].url;
    // popclip.showText(data.data[0].url, {preview: true})
    const imageHTML = `<img src=${imageUrl} alt=${input.text}/>`;
    const linkHTML = `<a href="${imageUrl}" >${input.text}</a>`;
    const appName = popclip.context.appName;
    if (SUPPORTS_IMG_HTML.includes(appName)) {
      popclip.pasteContent({
        "public.html": imageHTML,
        "public.utf8-plain-text": input.text,
      });
    } else if (SUPPORTS_A_HTML.includes(appName)) {
      popclip.pasteContent({
        "public.html": linkHTML,
        "public.utf8-plain-text": input.text,
      });
    } else {
      const tinyurlResponse = await axios.post(
        "https://api.tinyurl.com/create",
        {
          url: imageUrl,
          alias: slugify(input.text),
        },
        {
          headers: {
            Authorization: `Bearer 3R49Hxa3n6mXENJy3HK3bvZSk2JrsZ4VN0sgi5u9g7xWI4eRnvNX8nIclpcb`,
          },
        }
      );
      const shortUrl = tinyurlResponse.data.data.tiny_url;
      popclip.pasteText(shortUrl);
    }
    popclip.showSuccess();
  } catch (e) {
    popclip.showText(getErrorInfo(e));
  }
  return null;
};

export { generateImage };
