import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.post(
      "https://bankaccountdata.gocardless.com/api/v2/token/new/",
      {
        secret_id: process.env.GOCARDLESS_SECRET_ID,
        secret_key: process.env.GOCARDLESS_SECRET_KEY,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    res.status(200).json(response.data); // { access, expires }
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Token konnte nicht erstellt werden." });
  }
}
