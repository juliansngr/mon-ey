import dbConnect from "@/db/dbConnect";
import Transaction from "@/db/models/Transaction";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const transactions = await Transaction.find();

    if (!transaction) {
      return res.status(404).json({ status: "Not Found" });
    }

    res.status(200).json(transaction);
  } else if (req.method === "POST") {
    try {
      const transactionData = req.body;
      await Transaction.create(transactionData);

      res.status(201).json({ status: "Transaction added" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  }
}
