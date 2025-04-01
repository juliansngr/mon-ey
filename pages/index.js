import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";
import TransactionsList from "@/components/TransactionsList/";

export default function HomePage() {
  const { data, isLoading, sortedEntries } = useTransactionsContext();

  if (isLoading) return null;

  return <TransactionsList transactions={sortedEntries} />;
}
