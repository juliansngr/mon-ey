import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";

export default function HomePage() {
  const { data, isLoading } = useTransactionsContext();

  if (isLoading) return null;

  return (
    <ul>
      {data.map((transaction) => {
        return (
          <li key={transaction.id}>
            <p>Transaction ID: {transaction.id}</p>
            <p>{transaction.amount}</p>
          </li>
        );
      })}
    </ul>
  );
}
