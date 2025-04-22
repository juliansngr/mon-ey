import AccountBalance from "@/components/AccountBalance";
import TransactionsHeader from "@/components/TransactionsHeader";
import TransactionsList from "@/components/TransactionsList/";
import { useTransactionsContext } from "@/contexts/TransactionsContext/TransactionsContext";
import { useEffect } from "react";

export default function HomePage() {
  const { isLoading, sortedEntries, data } = useTransactionsContext();

  if (isLoading) return null;

  return (
    <>
      <AccountBalance transactions={data} />
      <TransactionsHeader hasAddButton />
      <TransactionsList transactions={sortedEntries} />
    </>
  );
}
