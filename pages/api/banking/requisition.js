import dbConnect from "@/db/dbConnect";
import BankConnection from "@/db/models/BankConnection";

export default async function handler(req, res) {
  const { access_token, institution_id, userId } = req.body;

  if (!access_token || !institution_id || !userId) {
    return res.status(400).json({ error: "Fehlende Daten" });
  }

  await dbConnect();

  const existing = await BankConnection.findOne({
    userId,
    institutionId: institution_id,
  });

  if (existing) {
    return res.status(200).json({
      message: "Bereits verbunden",
      requisition_id: existing.requisitionId,
      reuse: true,
    });
  }

  try {
    const response = await fetch(
      "https://bankaccountdata.gocardless.com/api/v2/requisitions/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          redirect: process.env.GOCARDLESS_REDIRECT_URI,
          institution_id,
          reference: `user-${userId}-${Date.now()}`,
          user_language: "de",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Fehler bei Requisition:", errorData);
      return res.status(response.status).json({
        error: errorData.detail || "Fehler beim Erstellen der Requisition.",
      });
    }

    const data = await response.json();
    const { id, link } = data;

    await BankConnection.create({
      userId,
      institutionId: institution_id,
      requisitionId: id,
    });

    res.status(200).json({ requisition_id: id, link });
  } catch (error) {
    console.error("Allgemeiner Fehler:", error.message);
    res.status(500).json({ error: "Requisition konnte nicht erstellt werden" });
  }
}
