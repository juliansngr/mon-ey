import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";
import TransactionsList from "@/components/TransactionsList/";
import TransactionForm from "@/components/TransactionForm";
import Modal from "@/components/Modal";

export default function HomePage() {
  const { isLoading, sortedEntries } = useTransactionsContext();

  if (isLoading) return null;

  return (
    <>
      <Modal title="Überschrift">
        <TransactionForm />
      </Modal>

      <TransactionsList transactions={sortedEntries} />
    </>
  );
}
