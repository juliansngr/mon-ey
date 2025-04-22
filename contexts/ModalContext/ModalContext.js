import DeleteForm from "@/components/DeleteForm";
import Modal from "@/components/Modal";
import TransactionFilters from "@/components/TransactionFilters";
import TransactionForm from "@/components/TransactionForm";
import { useRouter } from "next/router";
import { useContext, createContext, useState, act, useEffect } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [activeModal, setActiveModal] = useState({ type: null, props: {} });
  const { pathname } = useRouter();

  useEffect(() => {
    closeModal();
  }, [pathname]);

  const openModal = (modalType, props = {}) => {
    setActiveModal({ type: modalType, props });
  };

  const closeModal = () => {
    setActiveModal({ type: null, props: {} });
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
      }}
    >
      {children}
      {activeModal.type === "addTransaction" && (
        <Modal title="Neue Transaktion erfassen" closeModal={closeModal}>
          <TransactionForm onSubmit={activeModal.props.onSubmit} />
        </Modal>
      )}
      {activeModal.type === "deleteTransaction" && (
        <Modal title="Bist du dir sicher?" closeModal={closeModal}>
          <DeleteForm
            id={activeModal.props.id}
            onDelete={activeModal.props.onDelete}
          />
        </Modal>
      )}
      {activeModal.type === "filter" && (
        <Modal title={activeModal.props.title} closeModal={closeModal}>
          <TransactionFilters filterType={activeModal.props.filterType} />
        </Modal>
      )}
      {activeModal.type === "updateTransaction" && (
        <Modal title={"Transaktion bearbeiten"} closeModal={closeModal}>
          <TransactionForm
            currentTransaction={activeModal.props.currentTransaction}
            onSubmit={activeModal.props.onSubmit}
          />
        </Modal>
      )}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  return useContext(ModalContext);
}
