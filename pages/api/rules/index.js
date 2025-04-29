import dbConnect from "@/db/dbConnect";
import Rule from "@/db/models/Rule";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ status: "Nicht eingeloggt" });
  }

  const userId = session?.user?.id;

  await dbConnect();

  if (req.method === "GET") {
    const rules = await Rule.find({ userId });

    if (!rules) {
      return res.status(404).json({ status: "Not Found" });
    }

    res.status(200).json(rules);
  } else if (req.method === "POST") {
    console.log("Received rule data:", req.body);
    try {
      const ruleData = {
        ...req.body,
        userId,
        consequences: {
          ...req.body.consequences,
          value: Array.isArray(req.body.consequences.value)
            ? req.body.consequences.value
            : [req.body.consequences.value],
        },
      };
      await Rule.create(ruleData);

      res.status(201).json({ status: "Rule added" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  }
}
