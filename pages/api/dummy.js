import transactions from "@/db/dummy.json";

export default function handler(req, res) {
  res.status(200).json(transactions);
}
