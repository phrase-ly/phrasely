import axios from "axios";

// the main chat action
// @ts-ignore 
const text_to_speech = async (input, options) => {
    let language = "";
    url_.searchParams.append("text", input)
    const response = await axios.post(
        'https://traefik.stg.open.textshuttle.com/api/unstable/v4/detect_language',
        // '{\n  "text": "Winston ging die Treppe hinauf."\n}',
        {
          'text': input
        },
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
    language = response.data.language
    // await axios.post(url_.toString())
    console.log(language)
    let url = new URL("https://us-central1-hackzurich23-8237.cloudfunctions.net/text2speech")
    url.searchParams.append("text", input)
    url.searchParams.append("lang", language)
// // 
    // shell.exec('./play_audio.sh', url)
    // await exec('bash /Users/jakubkaczmarski/phrasely/source/extensions/phrasely-speech.popclipext/play_audio.sh', url.toString(), () => {})
    const { exec } = require('child_process');
    exec('bash ./play_audio.sh ' + url.toString(), (err, stdout, stderr) => {
    if (err) {
        //some err occurred
        console.error(err)
    } else {
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    }
    });
    console.log("Played the audio plz", url.toString())
}

text_to_speech("Hi how's it goingHi how's it goingHi how's it goingHi how's it  going Hi how's it goingHi how's it goingHi how's it goingHi how's it  going ", "")
// export the actions
//@ts-ignore
export const actions: Action[] = [{
  title: "TextoSpeech",
  code: text_to_speech,
}];
