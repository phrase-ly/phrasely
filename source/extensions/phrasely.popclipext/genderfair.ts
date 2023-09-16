import { ChatResponse, getErrorInfo, getOpenAI } from "./openai";
import { identifyLangugage } from "./langid";

const REPHRASING_PREFIX_DE = [
  {
    role: "system",
    content:
      "Formuliere den folgenden Text um, sodass er gendergerecht ist wie in folgenden Beispielen",
  },
  {
    role: "user",
    content:
      "Unter den Teilnehmern waren viele Bewunderer des Experten für KI.",
  },
  {
    role: "assistant",
    content: "Unter den Mitgliedern waren viele Fans der KI-Koryphäe.",
  },
  {
    role: "user",
    content:
      "Die Tagung richtet sich an Journalisten und an Mitarbeiter, Studenten, Assistenten, Doktoranden und Dozenten der Universität.",
  },
  {
    role: "assistant",
    content:
      "Die Tagung richtete sich an Medienschaffende und an Angestellte, Studierende, Assistierende, Doktorierende und Dozierende der Universität.",
  },
  {
    role: "user",
    content:
      "Der Reiseleiter versicherte der Mannschaft, dass sie sowohl von den Zuschauern und den Kunden wie auch von den Bürgern im Allgemeinen viel Unterstützung geniesst.",
  },
  {
    role: "assistant",
    content:
      "Die Reiseleitung versicherte dem Team, dass es sowohl vom Publikum und der Kundschaft wie auch von der Bevölkerung im Allgmeinen viel Unterstützung geniesst.",
  },
];

const REPHRASING_PREFIX_EN = [
  { 
    role: "system",
    content: "Rephrase the following text in a gender-fair way"
  }
]

const RATING_PREFIX_DE = [
  {
    role: "system",
    content:
      "Welche der gendergerechten Umformulierungen des Textes ist die beste? Antworte mit dem Index der Umformulierung.",
  },
];

const RATING_PREFIX_EN = [
  {
    role: "system",
    content: "Which of the gender-fair rephrasings is the best? Answer with the index number of the rephrasing."
  }
];

const rephraseGenderfair = async (input, options) => {
  const openai = getOpenAI(options);
  const text = input.text;
  

  // first to language identification
  const languageTag = await identifyLangugage(text, openai);

  // if languageTag is de, use REPHRASING_PREFIX_DE, otherwise use REPHRASING_PREFIX_EN
  const REPHRASING_PREFIX = languageTag === "de" ? REPHRASING_PREFIX_DE : REPHRASING_PREFIX_EN;
  const RATING_PREFIX = languageTag === "de" ? RATING_PREFIX_DE : RATING_PREFIX_EN;

  try {
    const { data }: ChatResponse = await openai.post("chat/completions", {
      model: "gpt-4",
      messages: [
        ...REPHRASING_PREFIX,
        {
          role: "user",
          content: text,
        },
      ],
      n: 5,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const suggestions = data.choices.map((choice) => choice.message.content);

    const prompt = suggestions.map((text, i) => `${i}: ${text}`).join("\n");

    const { data: rating_response }: ChatResponse = await openai.post(
      "chat/completions",
      {
        model: "gpt-4",
        messages: [
          ...RATING_PREFIX,
          {
            role: "user",
            content: `Text: ${text} \n${prompt}`,
          },
        ],
        n: 10,
        temperature: 1,
        max_tokens: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }
    );

    const votes = new Map();

    for (const rating of rating_response.choices) {
      try {
        const index = parseInt(rating.message.content);
        if (!isNaN(index)) {
          votes.set(index, (votes.get(index) || 0) + 1);
        }
      } catch (error) {
        // Handle any potential errors here
      }
    }
    const sortedVotes = [...votes.entries()].sort((a, b) => b[1] - a[1]);
    const [i, n] = sortedVotes[0];

    popclip.pasteText(suggestions[i]);
    popclip.showSuccess();
  } catch (e) {
    popclip.showText(getErrorInfo(e));
  }
  return null;
};

export { rephraseGenderfair };
