import { useModalContext } from "@/contexts/ModalContext/ModalContext";
import { useTransactionsContext } from "@/contexts/TransactionsContext/TransactionsContext";
import { handleTransactionAdd } from "@/utils/TransactionsHandler";
import { CirclePlus } from "lucide-react";
import styled from "styled-components";

export default function TransactionsHeader({ hasAddButton = false }) {
  const { mutate } = useTransactionsContext();
  const { openModal, closeModal } = useModalContext();
  return (
    <>
      <StyledHeaderWrapper>
        <StyledH2>Transaktionen</StyledH2>
        {hasAddButton && (
          <StyledAddButton
            onClick={() => {
              openModal("addTransaction", {
                onSubmit: (event) => {
                  handleTransactionAdd(event, { mutate, closeModal });
                },
              });
            }}
            aria-label="Neue Transaktion hinzufügen"
          >
            <StyledCirclePlus aria-hidden="true" />
          </StyledAddButton>
        )}
      </StyledHeaderWrapper>
    </>
  );
}

const StyledH2 = styled.h2`
  font-size: var(--2xl);
  margin-bottom: 1rem;
`;

const StyledAddButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--green-500);
  width: 2.25rem;
  height: 2.25rem;
  cursor: pointer;
`;

const StyledCirclePlus = styled(CirclePlus)`
  width: 100%;
  height: 100%;
  transition: background-color 0.6s ease, transform 0.8s ease;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
