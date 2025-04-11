import rulebase from "@/db/dummy-rules.json";

let data = [...rulebase];

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      res.status(200).json(data);
      break;
    default:
      response.status(405).json({ status: "Method not allowed." });
  }
}
