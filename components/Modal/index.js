import { useState } from "react";
import styled from "styled-components";
import { CircleX } from "lucide-react";
import { useModalContext } from "@/utils/ModalContext/ModalContext";

export default function Modal({ children, title }) {
  const { modalOpen, handleModalClose } = useModalContext();

  return (
    <ModalContainer $openingState={modalOpen} onClick={handleModalClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <CloseIcon onClick={handleModalClose} />
        </ModalHeader>
        <ModalHeading>{title}</ModalHeading>
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
  padding-top: var(--4xl);
  border-radius: var(--xs);

  position: relative;
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
  margin-bottom: var(--sm);
  font-size: var(--xl);
`;

const CloseIcon = styled(CircleX)`
  position: absolute;
  right: var(--sm);
  top: var(--sm);
  color: var(--green-950);
  width: var(--4xl);
  height: var(--4xl);
  cursor: pointer;
`;
