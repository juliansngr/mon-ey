import dayjs from "dayjs";
import axios from "axios";

export async function handleTransactionAdd(event, { mutate, closeModal }) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const rawData = Object.fromEntries(formData);

  const amount = Number(
    rawData.type === "expense" ? `-${rawData.amount}` : `${rawData.amount}`
  );

  const transactionData = {
    ...rawData,
    amount: amount,
    date: dayjs(rawData.date).format("YYYY-MM-DDTHH:mm:ss"),
  };

  const response = await axios.post("/api/transactions", transactionData);

  if (response.ok) {
    mutate();
    closeModal();
  }

  if (!response.ok) {
    closeModal();
  }
}

export async function handleTransactionUpdate(
  event,
  id,
  { mutate, closeModal }
) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const rawData = Object.fromEntries(formData);

  const amount = Number(
    rawData.type === "expense" ? `-${rawData.amount}` : `${rawData.amount}`
  );

  const transactionData = {
    ...rawData,
    amount: amount,
    date: dayjs(rawData.date).format("YYYY-MM-DDTHH:mm:ss"),
  };

  const response = await fetch(`/api/transactions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transactionData),
  });
  if (response.ok) {
    mutate();
    closeModal();
  }

  if (!response.ok) {
    closeModal();
  }
}
