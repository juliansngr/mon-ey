import rulebase from "@/db/dummy-rules.json";

let data = [...rulebase];

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      res.status(200).json(data);
      break;
    case "POST":
      const newRuleData = req.body;
      data = [newRuleData, ...data];
      res.status(200).json({ status: "Item succesfully added" });
      break;
    default:
      response.status(405).json({ status: "Method not allowed." });
  }
}
