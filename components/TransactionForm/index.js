import styled from "styled-components";
import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";

export default function TransactionForm() {
  const { data } = useTransactionsContext();

  const singleCategories = [...new Set(data.map((item) => item.category))];

  return (
    <StyledForm>
      <StyledFormInput
        type="number"
        id="amount"
        name="transaction_amount"
        placeholder="Summe"
        required
      ></StyledFormInput>
      <StyledFormInput
        type="text"
        id="amount"
        name="transaction_amount"
        placeholder="An wen? bzw. Von wem?"
        required
      ></StyledFormInput>
      <StyledFormSelect id="category" name="transaction_category" required>
        {singleCategories.map((cat) => (
          <StyledFormSelectOption key={cat} value={cat}>
            {cat}
          </StyledFormSelectOption>
        ))}
      </StyledFormSelect>
      <StyledFormDate type="date"></StyledFormDate>
      <StyledFormSubmit>Hinzuf&uuml;gen</StyledFormSubmit>
    </StyledForm>
  );
}

const StyledForm = styled.form``;

const StyledFormInput = styled.input``;

const StyledFormSelect = styled.select``;
const StyledFormSelectOption = styled.option``;
const StyledFormSubmit = styled.button``;
const StyledFormDate = styled.input``;
