import { CircleX } from "lucide-react";
import styled from "styled-components";

export default function Modal({ children, title, closeModal }) {
  return (
    <ModalContainer onClick={closeModal}>
      <ModalWrapper onClick={(event) => event.stopPropagation()}>
        <ModalHeader>
          <CloseIcon onClick={closeModal} />
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

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 500;

  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);

  padding: var(--4xl);
`;

const ModalWrapper = styled.div`
  background-color: white;
  box-shadow: var(--box-shadow-default);
  padding: var(--4xl) var(--2xl) var(--2xl);
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
