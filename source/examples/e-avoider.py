import os
from collections import Counter

import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

REPHRASING_PREFIX = [
    {"role": "system", "content": 'Formuliere folgenden Text ohne den Buchstaben "e"'},
    # {
    #   "role": "user",
    #   "content": "Könnte der Tunnel einstürzen?"
    # },
    # {
    #   "role": "assistant",
    #   "content": "Ob wohl das Rundloch in sich stürzt?"
    # },
    {"role": "user", "content": "Ich habe viele bunte Smarties gegessen"},
    {"role": "assistant", "content": "Ich ass zu Hauf Schokosnacks in Farbe"},
    {"role": "user", "content": "Heute lerne ich etwas über Künstliche Intelligenz. "},
    {"role": "assistant", "content": "Ich bring mich nun auf Trab mit AI."},
    # {
    #   "role": "user",
    #   "content": "Ich habe irgendwie noch gar keinen Hunger"
    # },
    # {
    #   "role": "assistant",
    #   "content": "Mir manglt's noch an Lust zur Nahrung."
    # },
    {"role": "user", "content": "Wie gut dass niemand weiss, dass ich Rumpelstilzchen heiss."},
    {
        "role": "assistant",
        "content": "Ich bin glücklich, dass Ihr nicht wisst, dass ich Rumpelstilzchen bin.",
    },
    {"role": "user", "content": "Zürich ist die schönste Stadt der Schweiz"},
    {"role": "assistant", "content": "Zürich ist Ort #1 im Land von Uhr und Kuh"},
    {"role": "user", "content": "Ein rotes Riesenrad dreht immer schneller"},
    {"role": "assistant", "content": "Das Gigarad in rot nimmt an Fahrt zu."},
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
    n=text.count("e") * 5,
    temperature=1,
    max_tokens=256,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0,
)

suggestions = [c["message"]["content"] for c in response["choices"]]
print(suggestions)
suggestions = [s for s in suggestions if "e" not in s]


RATING_PREFIX = [
    {
        "role": "system",
        "content": "Welche der Umformulierungen des Textes ohne den Buchstaben 'e' ist die beste? ",
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
