export default async function handler(req, res) {
  const { access_token, requisition_id } = req.body;

  if (!access_token || !requisition_id) {
    return res.status(400).json({ error: "Fehlende Zugangsdaten." });
  }

  try {
    const response = await fetch(
      `https://bankaccountdata.gocardless.com/api/v2/requisitions/${requisition_id}/`,
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
        .json({ error: errorData.detail || "Fehler beim Abrufen der Konten." });
    }

    const data = await response.json();

    res.status(200).json({ accountIds: data.accounts });
  } catch (error) {
    console.error("Allgemeiner Fehler:", error.message);
    res.status(500).json({ error: "Konten konnten nicht geladen werden." });
  }
}
