import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";

export default function HomePage() {
  const { data, isLoading } = useTransactionsContext();

  if (isLoading) return null;

  return (
    <>
      {data.map((transaction) => {
        return <p key={transaction.id}>{transaction.amount}</p>;
      })}

      {/* <container>
        <header></header>
        <main></main>
        <nav></nav>
      </container> */}
    </>
  );
}
