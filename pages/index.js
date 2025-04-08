import AccountBalance from "@/components/AccountBalance";
import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";
import { useModalContext } from "@/utils/ModalContext/ModalContext";
import TransactionsList from "@/components/TransactionsList/";
import TransactionForm from "@/components/TransactionForm";
import TransactionsHeader from "@/components/TransactionsHeader";
import Modal from "@/components/Modal";

export default function HomePage() {
  const { isLoading, sortedEntries, data } = useTransactionsContext();
  const { modalOpen } = useModalContext();

  if (isLoading) return null;

  return (
    <>
      {modalOpen && (
        <Modal title="Neue Transaktion erfassen">
          <TransactionForm />
        </Modal>
      )}
      <AccountBalance transactions={data} />
      <TransactionsHeader hasAddButton />
      <TransactionsList transactions={sortedEntries} />
    </>
  );
}
