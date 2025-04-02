import { useState } from "react";
import styled from "styled-components";
import { CircleX } from "lucide-react";

export default function Modal({ children, title }) {
  const [modalOpen, setModalOpen] = useState(true);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <ModalContainer $openingState={modalOpen} onClick={handleModalClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalHeading>{title}</ModalHeading>
          <CloseIcon onClick={handleModalClose} />
        </ModalHeader>
        {children}
      </ModalWrapper>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: ${(props) => (props.$openingState ? "flex" : "none")};
  justify-content: center;
  align-items: center;

  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);

  padding: var(--4xl) var(--4xl);
`;

const ModalWrapper = styled.div`
  background-color: white;
  box-shadow: 0 0 0 1px #d2d2d5, 0 10px 15px -3px rgba(0, 0, 0, 0.05),
    0 4px 6px -4px rgba(0, 0, 0, 0.05);

  padding: var(--2xl) var(--2xl);
  border-radius: var(--xs);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: var(--md);
`;

const ModalHeading = styled.h3`
  font-weight: 500;
  font-size: var(--xl);
`;

const CloseIcon = styled(CircleX)`
  color: var(--green-950);
`;
