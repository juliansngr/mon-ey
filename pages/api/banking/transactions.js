export default async function handler(req, res) {
  const { access_token, account_id } = req.body;

  if (!access_token || !account_id) {
    return res.status(400).json({ error: "Fehlende Daten." });
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchTransactions = async (retries = 30, interval = 1000) => {
    for (let i = 0; i < retries; i++) {
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

      if (response.ok) {
        const data = await response.json();
        return { transactions: data.transactions?.booked || [] };
      }

      const errorData = await response.json();
      if (response.status === 409 && errorData.type === "AccountProcessing") {
        console.log(`Versuch ${i + 1}: Account is still processing...`);
        await delay(interval);
        continue;
      }

      return { error: errorData.detail || "Unbekannter Fehler" };
    }

    return { error: "Account war nach 30 Sekunden nicht bereit." };
  };

  try {
    const result = await fetchTransactions();

    if (result.error) {
      console.error("Fehler beim Laden der Transaktionen:", result.error);
      return res.status(409).json({ error: result.error });
    }

    return res.status(200).json({ transactions: result.transactions });
  } catch (error) {
    console.error("Unerwarteter Fehler:", error.message);
    return res
      .status(500)
      .json({ error: "Transaktionen konnten nicht geladen werden." });
  }
}
