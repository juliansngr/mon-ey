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
      {/* <StyledFormDate></StyledFormDate> */}
      <StyledFormSubmit>Hinzuf&uuml;gen</StyledFormSubmit>
    </StyledForm>
  );
}

const StyledForm = styled.form``;

const StyledFormInput = styled.input`
  input::-webkit-outer-spin-button,
  nput::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }
`;

const StyledFormSelect = styled.select``;
const StyledFormSelectOption = styled.option``;
const StyledFormSubmit = styled.button``;
// const StyledFormDate = styled.date``;
