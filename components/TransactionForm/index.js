import styled from "styled-components";
import categories from "@/db/categories.json";
import dayjs from "dayjs";

export default function TransactionForm({ onSubmit, currentTransaction }) {
  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledFormInput
        type="number"
        id="amount"
        name="amount"
        placeholder="Betrag (in €)"
        defaultValue={
          currentTransaction?.amount && Math.abs(currentTransaction.amount)
        }
        step="0.01"
        min="0.01"
        aria-label="Betrag der Transaktion"
        required
      />
      <StyledFormInput
        type="text"
        id="partner"
        name="partner"
        placeholder="An wen? bzw. Von wem?"
        defaultValue={currentTransaction?.partner}
        aria-label="Empfänger oder Absender der Transaktion"
        required
      />
      <StyledFormInputRadioSection>
        <StyledFormInputRadio
          type="radio"
          name="type"
          id="transaction_type_income"
          value="income"
          defaultChecked={currentTransaction?.type === "income"}
        />
        <StyledFormLabel htmlFor="transaction_type_income">
          Einnahme
        </StyledFormLabel>
      </StyledFormInputRadioSection>
      <StyledFormInputRadioSection>
        <StyledFormInputRadio
          type="radio"
          name="type"
          id="transaction_type_expense"
          value="expense"
          defaultChecked={currentTransaction?.type === "expense"}
        />
        <StyledFormLabel htmlFor="transaction_type_expense">
          Ausgabe
        </StyledFormLabel>
      </StyledFormInputRadioSection>

      <StyledFormSelect
        id="category"
        name="category"
        required
        aria-label="Kategorie der Transaktion wählen"
        defaultValue={currentTransaction?.category}
      >
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
        defaultValue={
          currentTransaction?.date
            ? dayjs().format(currentTransaction.date)
            : dayjs().format("YYYY-MM-DDTHH:mm")
        }
        aria-label="Zeitpunkt der Transaktion wählen"
      />
      <StyledFormSubmit aria-label="Transaktion hinzufügen">
        {currentTransaction ? "Änderungen speichern" : "Hinzufügen"}
      </StyledFormSubmit>
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
