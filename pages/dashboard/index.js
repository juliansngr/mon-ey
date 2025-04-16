import AccountBalance from "@/components/AccountBalance";
import Modal from "@/components/Modal";
import TransactionForm from "@/components/TransactionForm";
import TransactionsHeader from "@/components/TransactionsHeader";
import TransactionsList from "@/components/TransactionsList/";
import { useModalContext } from "@/contexts/ModalContext/ModalContext";
import { useTransactionsContext } from "@/contexts/TransactionsContext/TransactionsContext";

import { useEffect } from "react";

export default function HomePage() {
  const { sortedEntries, data } = useTransactionsContext();
  const { handleFilterChange } = useTransactionsContext();

  useEffect(() => {
    handleFilterChange({ type: null, pattern: null });
  }, []);

  return (
    <>
      <AccountBalance transactions={data} />
      <TransactionsHeader hasAddButton />
      <TransactionsList transactions={sortedEntries} />
    </>
  );
}
