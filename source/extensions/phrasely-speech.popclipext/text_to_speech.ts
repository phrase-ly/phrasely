import axios from "axios";

// the main chat action
// @ts-ignore 
const text_to_speech: ActionFunction = async (input, options) => {
    let language = ""
    await axios.post("https://traefik.stg.open.textshuttle.com/api/unstable/v4/detect_language", JSON.parse(input.text)).then((response) => 
    {
        language = response.data
    });

    let url = new URL("https://us-central1-hackzurich23-8237.cloudfunctions.net/text2speech")
    url.searchParams.append("text", input.text)
    url.searchParams.append("lang", language)
// 
    // shell.exec('./play_audio.sh', url)
    const { exec } = require('child_process');
    exec('bash ./play_audio.sh', url, (err, stdout, stderr) => {
    if (err) {
        //some err occurred
        console.error(err)
    } else {
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    }
    });
}

// export the actions
// @ts-ignore 
export const actions: Action[] = [{
  title: "TextoSpeech",
  code: text_to_speech,
}];
