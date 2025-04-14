import AccountBalance from "@/components/AccountBalance";
import TransactionsHeader from "@/components/TransactionsHeader";
import TransactionsList from "@/components/TransactionsList/";
import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";
import { useEffect } from "react";

export default function HomePage() {
  const { isLoading, sortedEntries, data } = useTransactionsContext();
  const { handleFilterChange } = useTransactionsContext();

  // todo: Lift up to transActionList
  useEffect(() => {
    handleFilterChange({ type: null, pattern: null });
  }, []);

  if (isLoading) return null;

  return (
    <>
      <AccountBalance transactions={data} />
      <TransactionsHeader hasAddButton />
      <TransactionsList transactions={sortedEntries} />
    </>
  );
}
