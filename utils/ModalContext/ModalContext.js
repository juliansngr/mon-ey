import { useContext, createContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalOpen, setModalOpen] = useState(true);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        modalOpen,
        handleModalClose,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  return useContext(ModalContext);
}
