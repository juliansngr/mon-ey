import styled from "styled-components";
import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";
import { useModalContext } from "@/utils/ModalContext/ModalContext";

export default function DeleteForm({ id, onDelete }) {
  const { mutate } = useTransactionsContext();
  const { closeModal } = useModalContext();

  async function handleDeleteTransaction() {
    const response = await fetch("/api/dummy", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
    if (response.ok) {
      mutate();
      onDelete();
      closeModal();
    }

    if (!response.ok) {
      closeModal();
    }
  }

  const handleNoDelete = () => {
    closeModal();
  };
  return (
    <ButtonConatiner>
      <YesButton onClick={handleDeleteTransaction}>Ja</YesButton>
      <NoButton onClick={handleNoDelete}>Nein</NoButton>
    </ButtonConatiner>
  );
}

const ButtonConatiner = styled.div`
  display: flex;
  gap: var(--xl);
`;

const StyledButton = styled.button`
  padding: var(--xs) var(--xl);
  line-height: 1.15;
  font-size: 100%;
  border: none;
  border-radius: var(--xs);
  color: var(--green-50);
`;

const YesButton = styled(StyledButton)`
  background-color: var(--green-500);
`;

const NoButton = styled(StyledButton)`
  background-color: var(--red-500);
`;
