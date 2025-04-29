import dbConnect from "@/db/dbConnect";
import Transaction from "@/db/models/Transaction";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { transactions, userId } = req.body;

  if (!Array.isArray(transactions) || !userId) {
    return res.status(400).json({ error: "Fehlende Daten" });
  }

  try {
    await dbConnect();

    const formatted = transactions.map((tx) => ({
      amount: parseFloat(tx.transactionAmount.amount),
      category: "Extern",
      type: tx.transactionAmount.amount < 0 ? "expense" : "income",
      date: `${tx.bookingDate}T00:00:00`,
      partner:
        tx.remittanceInformationUnstructured ||
        tx.remittanceInformationStructured ||
        "Unbekannt",
      userId,
    }));

    await Transaction.insertMany(formatted);

    res.status(200).json({ success: true, count: formatted.length });
  } catch (error) {
    console.error("Fehler beim Speichern:", error);
    res.status(500).json({ error: "Fehler beim Speichern" });
  }
}
