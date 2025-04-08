import styled from "styled-components";
import { CirclePlus } from "lucide-react";
import { useModalContext } from "@/utils/ModalContext/ModalContext";

export default function TransactionsHeader({ hasAddButton = false }) {
  const { handleModalCall } = useModalContext();
  return (
    <>
      <StyledHeaderWrapper>
        <StyledH2>Transaktionen</StyledH2>
        {hasAddButton && (
          <StyledAddButton
            onClick={handleModalCall}
            aria-label="add a transaction"
          >
            <StyledCirclePlus />
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
`;

const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
