export default async function handler(req, res) {
  const { id, accessToken } = req.body;

  if (!id || !accessToken) {
    return res.status(400).json({ error: "Missing id or accessToken" });
  }

  const maxRetries = 30;
  const delay = 1000; // 1 Sekunde

  const pollStatus = async () => {
    for (let i = 0; i < maxRetries; i++) {
      const response = await fetch(
        `https://bankaccountdata.gocardless.com/api/v2/accounts/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 409) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
        return res.status(response.status).json({ error: errorData });
      }

      const data = await response.json();
      console.log("Polled status:", data.status);

      if (data.status === "READY") {
        return res.status(200).json({ status: "READY" });
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    return res
      .status(504)
      .json({ error: "Timeout while waiting for READY status" });
  };

  await pollStatus();
}
