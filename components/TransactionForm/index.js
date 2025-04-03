import styled from "styled-components";
import categories from "@/db/categories.json";
import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";
import { useModalContext } from "@/utils/ModalContext/ModalContext";

export default function TransactionForm() {
  const { mutate } = useTransactionsContext();
  const { handleModalClose } = useModalContext();

  async function handleTransactionSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const rawData = Object.fromEntries(formData);

    const transactionData = { ...rawData, id: crypto.randomUUID() };

    console.log(transactionData);

    const response = await fetch("/api/dummy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    });
    if (response.ok) {
      mutate();
      handleModalClose();
    }
  }
  return (
    <StyledForm onSubmit={handleTransactionSubmit}>
      <StyledFormInput
        type="number"
        id="amount"
        name="amount"
        placeholder="Summe"
        required
      ></StyledFormInput>
      <StyledFormInput
        type="text"
        id="partner"
        name="partner"
        placeholder="An wen? bzw. Von wem?"
        required
      ></StyledFormInput>
      <StyledFormInput
        type="radio"
        name="type"
        id="transaction_type_income"
        value="income"
      ></StyledFormInput>
      <StyledFormLabel for="transaction_type_income">Einnahme</StyledFormLabel>
      <StyledFormInput
        type="radio"
        name="type"
        id="transaction_type_expense"
        value="expense"
      ></StyledFormInput>
      <StyledFormLabel for="transaction_type_expense">Ausgabe</StyledFormLabel>

      <StyledFormSelect id="category" name="category" required>
        {categories.map((cat) => (
          <StyledFormSelectOption key={cat} value={cat}>
            {cat}
          </StyledFormSelectOption>
        ))}
      </StyledFormSelect>
      <StyledFormInput type="date" name="date"></StyledFormInput>
      <StyledFormSubmit>Hinzuf&uuml;gen</StyledFormSubmit>
    </StyledForm>
  );
}

const StyledForm = styled.form``;
const StyledFormInput = styled.input``;
const StyledFormSelect = styled.select``;
const StyledFormSelectOption = styled.option``;
const StyledFormSubmit = styled.button``;
const StyledFormLabel = styled.label``;
