import axios from "axios";

export default async function handler(req, res) {
  const { access_token, account_id } = req.body;

  try {
    const response = await axios.get(
      `https://bankaccountdata.gocardless.com/api/v2/accounts/${account_id}/transactions/`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const transactions = response.data.transactions.booked;

    res.status(200).json({ transactions });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res
      .status(500)
      .json({ error: "Transaktionen konnten nicht geladen werden." });
  }
}
