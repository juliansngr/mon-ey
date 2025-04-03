import styled from "styled-components";
import categories from "@/db/categories.json";
import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";
import { useModalContext } from "@/utils/ModalContext/ModalContext";
import dayjs from "dayjs";

export default function TransactionForm() {
  const { mutate } = useTransactionsContext();
  const { handleModalClose } = useModalContext();

  async function handleTransactionSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const rawData = Object.fromEntries(formData);

    console.log("raw", rawData);

    const amount = Number(
      `${rawData.type === "expense" && "-"}${rawData.amount}`
    );

    const transactionData = {
      ...rawData,
      amount: amount,
      id: crypto.randomUUID(),
      date: dayjs(rawData.date).format("YYYY-MM-DDTHH:mm:ss"),
    };

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
        placeholder="Summe (in €)"
        required
      ></StyledFormInput>
      <StyledFormInput
        type="text"
        id="partner"
        name="partner"
        placeholder="An wen? bzw. Von wem?"
        required
      ></StyledFormInput>
      <StyledFormInputRadioSection>
        <StyledFormInputRadio
          type="radio"
          name="type"
          id="transaction_type_income"
          value="income"
        ></StyledFormInputRadio>
        <StyledFormLabel for="transaction_type_income">
          Einnahme
        </StyledFormLabel>
      </StyledFormInputRadioSection>
      <StyledFormInputRadioSection>
        <StyledFormInputRadio
          type="radio"
          name="type"
          id="transaction_type_expense"
          value="expense"
        ></StyledFormInputRadio>
        <StyledFormLabel for="transaction_type_expense">
          Ausgabe
        </StyledFormLabel>
      </StyledFormInputRadioSection>

      <StyledFormSelect id="category" name="category" required>
        <StyledFormSelectOption value="">
          -Bitte Kategorie ausw&auml;hlen-
        </StyledFormSelectOption>
        {categories.map((cat) => (
          <StyledFormSelectOption key={cat} value={cat}>
            {cat}
          </StyledFormSelectOption>
        ))}
      </StyledFormSelect>
      <StyledFormInput
        type="datetime-local"
        name="date"
        defaultValue={dayjs().format("YYYY-MM-DDTHH:mm")}
      ></StyledFormInput>
      <StyledFormSubmit>Hinzuf&uuml;gen</StyledFormSubmit>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  width: 300px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: var(--base);
`;
const StyledFormInput = styled.input`
  padding: var(--3xs);
  line-height: 1.15;
  font-size: 100%;
`;
const StyledFormSelect = styled.select`
  padding: var(--3xs);
  line-height: 1.15;
  font-size: 100%;
`;
const StyledFormSelectOption = styled.option``;
const StyledFormSubmit = styled.button`
  padding: var(--3xs);
  line-height: 1.15;
  font-size: 100%;
`;
const StyledFormLabel = styled.label``;
const StyledFormInputRadioSection = styled.section`
  gap: var(--base);
`;
const StyledFormInputRadio = styled.input`
  margin-right: var(--2xs);
`;
