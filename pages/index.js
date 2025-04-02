import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";
import TransactionsList from "@/components/TransactionsList/";
import TransactionForm from "@/components/TransactionForm";

export default function HomePage() {
  const { isLoading, sortedEntries } = useTransactionsContext();

  if (isLoading) return null;

  return (
    <>
      <TransactionsList transactions={sortedEntries} />
      <TransactionForm></TransactionForm>
    </>
  );
}
