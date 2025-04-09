import transactions from "@/db/dummy.json";

let data = [...transactions];

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      res.status(200).json(data);
      break;
    case "POST":
      const newTransactionData = req.body;
      data = [newTransactionData, ...data];
      res.status(200).json({ status: "Item succesfully added" });
      break;
    case "DELETE":
      const idToDelete = req.body;
      data = data.filter((transaction) => idToDelete !== transaction.id);
      res.status(200).json({ status: "Item deleted" });
      break;
    default:
      response.status(405).json({ status: "Method not allowed." });
  }
}
