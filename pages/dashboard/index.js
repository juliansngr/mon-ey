import AccountBalance from "@/components/AccountBalance";
import TransactionsHeader from "@/components/TransactionsHeader";
import TransactionsList from "@/components/TransactionsList/";
import { useModalContext } from "@/contexts/ModalContext/ModalContext";
import { useTransactionsContext } from "@/contexts/TransactionsContext/TransactionsContext";

import { useEffect } from "react";

export default function HomePage() {
  const { sortedEntries, data, handleFilterChange } = useTransactionsContext();
  const { closeModal } = useModalContext();

  useEffect(() => {
    handleFilterChange({ type: null, pattern: null });
    closeModal();
  }, []);

  return (
    <>
      <AccountBalance transactions={data} />
      <TransactionsHeader hasAddButton />
      <TransactionsList transactions={sortedEntries} />
    </>
  );
}
