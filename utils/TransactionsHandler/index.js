import dayjs from "dayjs";

export async function handleTransactionAdd(event, { mutate, closeModal }) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const rawData = Object.fromEntries(formData);

  const amount = Number(
    rawData.type === "expense" ? `-${rawData.amount}` : `${rawData.amount}`
  );

  const category = rawData.category.replace(/^./, (match) =>
    match.toUpperCase()
  );

  const transactionData = {
    ...rawData,
    amount: amount,
    category: category,
    date: dayjs(rawData.date).format("YYYY-MM-DDTHH:mm:ss"),
  };

  const response = await fetch("/api/transactions", {
    method: "POST",
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
