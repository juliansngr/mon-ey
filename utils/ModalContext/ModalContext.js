import DeleteForm from "@/components/DeleteForm";
import Modal from "@/components/Modal";
import TransactionFilters from "@/components/TransactionFilters";
import TransactionForm from "@/components/TransactionForm";
import { useContext, createContext, useState, act } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [activeModal, setActiveModal] = useState({ type: null, props: {} });

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
          <TransactionForm />
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
          <TransactionFilters
            setActiveFilterType={activeModal.props.setActiveFilterType}
            setAppliedFilterType={activeModal.props.setAppliedFilterType}
            getTransactionsFiltered={activeModal.props.getTransactionsFiltered}
            filterType={activeModal.props.filterType}
          />
        </Modal>
      )}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  return useContext(ModalContext);
}
