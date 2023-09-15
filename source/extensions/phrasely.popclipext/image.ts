import axios from "axios";

interface Image {
    url: string
}

interface ImageResponse {
    created: Number
    data: Image[]
}


const SUPPORTS_HTML = ["Microsoft Word"]

const generateImage: ActionFunction = async (input, options) => {
    const openai = axios.create({
        baseURL: "https://api.openai.com/v1",
        headers: { Authorization: `Bearer ${options.apikey}` },
        timeout: 60_000
    });

    // send the whole message history to OpenAI
    try {
        const response = await openai.post(
            "/images/generations",
            {
                "prompt": input.text,
                "n": 1, // Todo move to options
                "size": "256x256" // Todo move to options
            },
        );


        const { data } = response
        // popclip.showText(data.data[0].url, {preview: true})
        const imageHTML = `<img src=${data.data[0].url} alt=${input.text}/>`
        const linkHTML = `<a href="${data.data[0].url}" >${input.text}</a>`
        const appName = popclip.context.appName
        popclip.showText(appName)
        if (SUPPORTS_HTML.includes(appName)) {
            popclip.pasteContent({"public.html": imageHTML, "public.utf8-plain-text": input.text});
        }
        else {
            popclip.pasteContent({"public.html": linkHTML, "public.utf8-plain-text": input.text});
        }
        popclip.showSuccess();
    } catch (e) {
        // @ts-ignore
        popclip.showText(e.toString());
    }
    return null;
};

export default generateImage;