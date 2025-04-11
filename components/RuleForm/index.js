import styled from "styled-components";
import categories from "@/db/categories.json";
import dayjs from "dayjs";

export default function RuleForm({ preconditionObjects, consequenceObjects }) {
  const operators = [
    { operator: "<", displayValue: "kleiner als" },
    { operator: ">", displayValue: "größer als" },
    { operator: "=<", displayValue: "kleiner als oder gleich" },
    { operator: ">=", displayValue: "größer als oder gleich" },
    { operator: "==", displayValue: "gleich" },
    { operator: "!=", displayValue: "darf nicht gleich" },
    { operator: "in", displayValue: "ist enthalten in/ einer der Werte von" },
    {
      operator: "ni",
      displayValue: "darf nicht enthalten sein in / ist keiner Werte von",
    },
  ];
  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledFormSection>
        <StyledFormInput
          type="text"
          id="precondtion_pattern"
          name="precondtion_pattern"
          placeholder="Auf welchen Wert wird geprüft"
          defaultValue=""
          aria-label="Prüfwert für Vorbedinung"
        />
        <StyledFormSelect
          id="precondition_object"
          name="precondition_object"
          aria-label="Auswählen, welches Datenfeld in der Vorbedingung überprüft wird"
          defaultValue=""
        >
          <StyledFormSelectOption value="">
            -Bitte ausw&auml;hlen: Welches Datenfeld wird geprüft?-
          </StyledFormSelectOption>
          {categories.map((cat) => (
            <StyledFormSelectOption key={cat} value={cat}>
              {cat}
            </StyledFormSelectOption>
          ))}
        </StyledFormSelect>
      </StyledFormSection>

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

const StyledFormSection = styled.section`
  gap: var(--base);
`;
