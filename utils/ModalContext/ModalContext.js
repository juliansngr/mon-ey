import { useContext, createContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalCall = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        modalOpen,
        handleModalClose,
        handleModalCall,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  return useContext(ModalContext);
}
