import AccountBalance from "@/components/AccountBalance";
import TransactionsList from "@/components/TransactionsList/";
import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";

export default function HomePage() {
  const { isLoading, sortedEntries, data } = useTransactionsContext();

  if (isLoading) return null;

  return (
    <>
      <AccountBalance transactions={data} />
      <TransactionsList transactions={sortedEntries} hasAddButton />
    </>
  );
}
