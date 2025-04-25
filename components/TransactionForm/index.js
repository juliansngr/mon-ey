import styled from "styled-components";
import categories from "@/db/categories.json";
import dayjs from "dayjs";
import NumberInput from "./inputs/NumberInput";
import TextInput from "./inputs/TextInput";
import RadioInput from "./inputs/RadioInput";
import SelectInput from "./inputs/SelectInput";
import DateInput from "./inputs/DateInput";

const transactionInputs = [
  {
    type: "number",
    name: "amount",
    placeholder: "Betrag (in €)",
    step: "0.01",
    min: "0.01",
    required: true,
  },
  {
    type: "text",
    name: "partner",
    placeholder: "An wen? bzw. Von wem?",
    required: true,
  },
  {
    type: "radio",
    name: "type",
    options: [
      { value: "income", label: "Einnahme" },
      { value: "expense", label: "Ausgabe" },
    ],
    required: true,
  },
  {
    type: "select",
    name: "category",
    options: [
      {
        value: "",
        label: "-Bitte Kategorie auswählen-",
        disabled: true,
        hidden: true,
      },
      ...categories.map((cat) => ({ value: cat, label: cat })),
    ],
    required: true,
  },
  { type: "datetime-local", name: "date" },
];

export default function TransactionForm({ onSubmit, currentTransaction }) {
  return (
    <StyledForm onSubmit={onSubmit}>
      {transactionInputs.map((input) => {
        switch (input.type) {
          case "number":
            return (
              <NumberInput
                key={input.name}
                {...input}
                defaultValue={currentTransaction?.[input.name]}
              />
            );
          case "text":
            return (
              <TextInput
                key={input.name}
                {...input}
                defaultValue={currentTransaction?.[input.name]}
              />
            );
          case "radio":
            return (
              <RadioInput
                key={input.name}
                {...input}
                defaultValue={currentTransaction?.[input.name]}
              />
            );
          case "select":
            return (
              <SelectInput
                key={input.name}
                {...input}
                defaultValue={
                  currentTransaction?.[input.name]
                    ? currentTransaction[input.name]
                    : ""
                }
              />
            );
          case "datetime-local":
            return (
              <DateInput
                key={input.name}
                {...input}
                defaultValue={
                  currentTransaction?.date
                    ? dayjs(currentTransaction.date).format("YYYY-MM-DDTHH:mm")
                    : dayjs().format("YYYY-MM-DDTHH:mm")
                }
              />
            );
          default:
            return null;
        }
      })}
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

const StyledFormSubmit = styled.button`
  padding: var(--3xs);
  line-height: 1.15;
  font-size: 100%;
`;
