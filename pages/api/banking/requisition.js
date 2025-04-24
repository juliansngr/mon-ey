import axios from "axios";
import dbConnect from "@/db/dbConnect";
import BankConnection from "@/db/models/BankConnection";

export default async function handler(req, res) {
  const { access_token, institution_id, userId } = req.body;

  if (!access_token || !institution_id || !userId) {
    return res.status(400).json({ error: "Fehlende Daten" });
  }

  await dbConnect();

  // 1. Prüfen, ob bereits eine Requisition existiert
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
    // 2. Neue Requisition erstellen
    const response = await axios.post(
      "https://bankaccountdata.gocardless.com/api/v2/requisitions/",
      {
        redirect: process.env.GOCARDLESS_REDIRECT_URI,
        institution_id,
        reference: `user-${userId}-${Date.now()}`,
        user_language: "de",
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { id, link } = response.data;

    // 3. In DB speichern
    await BankConnection.create({
      userId,
      institutionId: institution_id,
      requisitionId: id,
    });

    res.status(200).json({ requisition_id: id, link });
  } catch (error) {
    console.error(
      "Fehler bei Requisition:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Requisition konnte nicht erstellt werden" });
  }
}
