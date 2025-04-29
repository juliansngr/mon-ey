import styled from "styled-components";
import dayjs from "dayjs";
import NumberInput from "./inputs/NumberInput";
import TextInput from "./inputs/TextInput";
import RadioInput from "./inputs/RadioInput";
import SelectInput from "./inputs/SelectInput";
import DateInput from "./inputs/DateInput";
import { useRulebaseContext } from "@/contexts/RulebaseContext/RulebaseContext";
import { getUiInputFromVariables } from "@/utils/RulebaseFunctionsLib/index.js";

export default function TransactionForm({ onSubmit, currentTransaction }) {
  const { initializedVariables } = useRulebaseContext();

  const transactionInputs = [
    "transactionAmount",
    "transactionPartner",
    "transactionType",
    "transactionCategory",
  ];

  const transactionInputsUi = getUiInputFromVariables({
    initializedVariables: initializedVariables,
    inputVariables: transactionInputs,
  });
  transactionInputsUi.push({
    type: "datetime-local",
    name: "date",
  });

  return (
    <StyledForm onSubmit={onSubmit}>
      {transactionInputsUi.map((input) => {
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
