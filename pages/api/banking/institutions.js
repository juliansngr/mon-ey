import axios from "axios";

export default async function handler(req, res) {
  const { access_token } = req.body;

  try {
    const response = await axios.get(
      "https://bankaccountdata.gocardless.com/api/v2/institutions/?country=DE",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Banken konnten nicht geladen werden." });
  }
}
