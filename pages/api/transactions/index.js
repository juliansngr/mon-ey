import dbConnect from "@/db/dbConnect";
import Transaction from "@/db/models/Transaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user?.id;

  if (!session) {
    return res.status(401).json({ status: "Nicht eingeloggt" });
  }

  await dbConnect();

  if (req.method === "GET") {
    const transactions = await Transaction.find({ userId });

    if (!transactions) {
      return res.status(404).json({ status: "Not Found" });
    }

    res.status(200).json(transactions);
  } else if (req.method === "POST") {
    try {
      const transactionData = { ...req.body, userId };
      await Transaction.create(transactionData);

      res.status(201).json({ status: "Transaction added" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  }
}
