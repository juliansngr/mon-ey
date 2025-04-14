import dbConnect from "@/db/dbConnect";
import Transaction from "@/db/models/Transaction";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ status: "Not Found" });
    }

    res.status(200).json(transaction);
  } else if (req.method === "PUT") {
    try {
      const transactionData = req.body;
      await Transaction.findByIdAndUpdate(id, transactionData);
      return res.status(200).json({ status: `Joke ${id} updated!` });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      await Transaction.findByIdAndDelete(id);
      return res.status(200).json({ status: `Transaction deleted!` });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  }
}
