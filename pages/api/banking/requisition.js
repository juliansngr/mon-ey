import axios from "axios";

export default async function handler(req, res) {
  const { access_token, institution_id } = req.body;

  try {
    const response = await axios.post(
      "https://bankaccountdata.gocardless.com/api/v2/requisitions/",
      {
        redirect: process.env.GOCARDLESS_REDIRECT_URI,
        institution_id,
        reference: `user-${Date.now()}`,
        user_language: "de",
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    res.status(200).json({
      link: response.data.link,
      requisition_id: response.data.id,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res
      .status(500)
      .json({ error: "Verbindung konnte nicht aufgebaut werden." });
  }
}
