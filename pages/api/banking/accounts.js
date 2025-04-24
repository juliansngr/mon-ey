import axios from "axios";

export default async function handler(req, res) {
  const { access_token, requisition_id } = req.body;

  try {
    const response = await axios.get(
      `https://bankaccountdata.gocardless.com/api/v2/requisitions/${requisition_id}/`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    res.status(200).json({ accountIds: response.data.accounts });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Konten konnten nicht geladen werden." });
  }
}
