import os
from collections import Counter

import openai

#openai.api_key = os.getenv("OPENAI_API_KEY")
openai.api_key = "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"

REPHRASING_PREFIX = [
    {
      "role": "system",
      "content": "Formuliere den folgenden Text um, sodass er gendergerecht ist wie in folgenden Beispielen"
    },
    {
      "role": "user",
      "content": "Unter den Teilnehmern waren viele Bewunderer des Experten für KI."
    },
    {
      "role": "assistant",
      "content": "Unter den Mitgliedern waren viele Fans der KI-Koryphäe."
    },
    {
      "role": "user",
      "content": "Die Tagung richtet sich an Journalisten und an Mitarbeiter, Studenten, Assistenten, Doktoranden und Dozenten der Universität."
    },
    {
      "role": "assistant",
      "content": "Die Tagung richtete sich an Medienschaffende und an Angestellte, Studierende, Assistierende, Doktorierende und Dozierende der Universität."
    },
    {
      "role": "user",
      "content": "Der Reiseleiter versicherte der Mannschaft, dass sie sowohl von den Zuschauern und den Kunden wie auch von den Bürgern im Allgemeinen viel Unterstützung geniessen."
    },
    {
      "role": "assistant",
      "content": "Die Reiseleitung versicherte dem Team, dass es sowohl vom Publikum und der Kundschaft wie auch von der Bevölkerung im Allgmeinen viel Unterstützung geniessen."
    },
    # {
    #   "role": "user",
    #   "content": "Die Studenten können sich bei den Helfern für die Blutspende anmelden."
    # },
    # {
    #   "role": "assistant",
    #   "content": "Die Student:innen können sich bei den Helfer:innen für die Blutspende anmelden."
    # }
]

text = input()

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        *REPHRASING_PREFIX,
        {
            "role": "user",
            "content": text,
        },
    ],
    n=5,
    temperature=1,
    max_tokens=256,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0,
)

suggestions = [c["message"]["content"] for c in response["choices"]]
print(suggestions)



RATING_PREFIX = [
    {
        "role": "system",
        "content": "Welche der gendergerechten Umformulierungen des Textes ist die beste? Antworte mit dem Index der Umformulierung.",
    }
]

prompt = "\n".join(f"{i}: {text}" for i, text in enumerate(suggestions))

rating_response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[*RATING_PREFIX, {"role": "user", "content": f"Text: {text} \n{prompt}"}],
    temperature=1,
    n=10,
    max_tokens=1,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0,
)

print(rating_response)
votes = Counter()
for rating in rating_response["choices"]:
    try:
        index = int(rating["message"]["content"])
        votes[index] += 1
    except ValueError:
        pass

print(votes)
i, n = votes.most_common(1)[0]
print(suggestions[i])
