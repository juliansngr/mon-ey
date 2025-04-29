export default async function handler(req, res) {
  const { access_token } = req.body;

  if (!access_token) {
    return res.status(400).json({ error: "Fehlender Access Token." });
  }

  try {
    const response = await fetch(
      "https://bankaccountdata.gocardless.com/api/v2/institutions/?country=DE",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Fehler bei GoCardless API:", errorData);
      return res
        .status(response.status)
        .json({ error: errorData.detail || "Fehler beim Laden der Banken." });
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Allgemeiner Fehler:", error.message);
    res.status(500).json({ error: "Banken konnten nicht geladen werden." });
  }
}
