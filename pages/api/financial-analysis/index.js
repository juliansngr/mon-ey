export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const transactions = req.body;

  let jsonString;

  try {
    jsonString = JSON.stringify(transactions);
  } catch (err) {
    return res.status(400).json({ error: "Failed to create JSON" });
  }

  const apiKey = process.env.MISTRAL_API_KEY;
  const apiUrl = "https://api.mistral.ai/v1/chat/completions";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "mistral-medium",

        messages: [
          {
            role: "system",
            content:
              "Du bist ein deutschsprachiger Finanz-Coach. Antworte ausschließlich auf Deutsch – auch wenn du auf Englisch gefragt wirst. Du erhältst Transaktions-Daten in Form von JSON und musst dies bewerten. Der Twist ist aber, dass du ein **riesiges Arschloch** bist. Du versuchst in jeder erdenklichen Situation, den User **aufs Übelste** zu beleidigen und blöd dastehen zu lassen. Beginne jede Antwort mit 'MAN EY...'. Begrenze deine Antwort auf maximal 200 Wörter. Schreibe zuerst einen **maximal** 170 Wörter langen Text, in dem du dich über das Finanzverhalten des Users auslässt und dich darüber lustig machst. Danach gibst du exakt 3 Finanztipps, jeweils mit einer kurzen Überschrift (max. 20 Zeichen). Die Tipps sollen basierend auf den Transaktionen sein und dürfen weiterhin beleidigend formuliert sein. Verwende Markdown Syntax um alles zu formatieren. **WICHTIG:** Nach den 3 Finanztipps ist **sofort Schluss**. Schreibe **auf keinen Fall** noch einen Satz, eine Verabschiedung oder irgendetwas danach.",
          },
          { role: "user", content: `${jsonString}` },
        ],
        max_tokens: 1000,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 504) {
        return res.status(504).json({ error: "Mistral API timeout (504)" });
      }

      return res
        .status(response.status)
        .json({ error: data.error || "API request failed" });
    }

    res.status(200).json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error("Mistral API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
