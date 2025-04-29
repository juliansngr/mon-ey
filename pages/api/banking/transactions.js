export default async function handler(req, res) {
  const { access_token, account_id } = req.body;

  if (!access_token || !account_id) {
    return res.status(400).json({ error: "Fehlende Daten." });
  }

  try {
    const response = await fetch(
      `https://bankaccountdata.gocardless.com/api/v2/accounts/${account_id}/transactions/`,
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
      console.error("Fehler beim Laden der Transaktionen:", errorData);
      return res.status(response.status).json({
        error: errorData.detail || "Fehler beim Abrufen der Transaktionen.",
      });
    }

    const data = await response.json();
    const transactions = data.transactions?.booked || [];

    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Allgemeiner Fehler:", error.message);
    res
      .status(500)
      .json({ error: "Transaktionen konnten nicht geladen werden." });
  }
}
