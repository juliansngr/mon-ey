import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";
import TransactionsList from "@/components/TransactionsList/";

export default function HomePage() {
  const { data, isLoading } = useTransactionsContext();

  if (isLoading) return null;

  return <TransactionsList transactions={data} />;
}
