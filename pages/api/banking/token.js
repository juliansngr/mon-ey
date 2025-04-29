export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://bankaccountdata.gocardless.com/api/v2/token/new/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          secret_id: process.env.GOCARDLESS_SECRET_ID,
          secret_key: process.env.GOCARDLESS_SECRET_KEY,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Fehler bei Token-Request:", errorData);
      return res.status(response.status).json({
        error: errorData.detail || "Token konnte nicht erstellt werden.",
      });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Netzwerkfehler:", error.message);
    res.status(500).json({ error: "Token konnte nicht erstellt werden." });
  }
}
