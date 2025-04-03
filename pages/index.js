import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";
import { useModalContext } from "@/utils/ModalContext/ModalContext";
import TransactionsList from "@/components/TransactionsList/";
import TransactionForm from "@/components/TransactionForm";
import Modal from "@/components/Modal";

export default function HomePage() {
  const { isLoading, sortedEntries } = useTransactionsContext();
  const { modalOpen } = useModalContext();

  if (isLoading) return null;

  return (
    <>
      {modalOpen && (
        <Modal title="Neue Transaktion erfassen">
          <TransactionForm />
        </Modal>
      )}

      <TransactionsList transactions={sortedEntries} />
    </>
  );
}
