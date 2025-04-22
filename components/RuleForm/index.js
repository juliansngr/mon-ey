import styled from "styled-components";
import { useState } from "react";
import {
  operators,
  getOperatorsForDatafield,
} from "@/utils/RulebaseFunctionsLib/rulebaseFunctions";
import { useRulebaseContext } from "@/utils/RulebaseContext/RulebaseContext";

export default function RuleForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    rule_description: "",
    has_precondition: "on",
    precondition_object: "",
    precondtion_operator: "",
    precondtion_pattern: "",
    consequence_object: "",
    consequence_operator: "",
    consequence_pattern: "",
  });

  const { preconditionObjects, consequenceObjects } = useRulebaseContext();

  const [selectablePrecondtionOperators, setSelectablePreconditionOperators] =
    useState(operators);
  const [selectableConsequenceOperators, setSelectableConsequenceOperators] =
    useState(operators);
  const [error, setError] = useState("");

  function handleFormInput(event) {
    let newFormData = {};
    switch (event.target.name) {
      case "precondition_object":
        const selectPreconditionObject = preconditionObjects.find(
          (item) => item.id === event.target.value
        );
        if (selectPreconditionObject) {
          newFormData = {
            ...formData,
            [event.target.name]: selectPreconditionObject,
          };
          handleInputPreconditionObjectChange(selectPreconditionObject);
        }
        break;
      case "consequence_object":
        const selectConsequenceObject = consequenceObjects.find(
          (item) => item.id === event.target.value
        );
        if (selectConsequenceObject) {
          newFormData = {
            ...formData,
            [event.target.name]: selectConsequenceObject,
          };
          handleInputConsequenceObjectChange(selectConsequenceObject);
        }
        break;
      case "has_precondition":
        const newToggleValue = !formData.has_precondition;
        newFormData = {
          ...formData,
          has_precondition: newToggleValue,
        };
        break;
      default:
        newFormData = {
          ...formData,
          [event.target.name]: event.target.value,
        };
    }
    setFormData(newFormData);
  }

  const patternListTestNumObjects = "^(\\d+([.,]\\d+)?)(#(\\d+([.,]\\d+)?))*$";

  function handleInputPreconditionObjectChange(selectPreconditionObject) {
    const operatorsForInputPreconditionObject = getOperatorsForDatafield({
      dataType: selectPreconditionObject.dataType,
      domainType: selectPreconditionObject.domainType,
      domainLength: selectPreconditionObject.domainValues.length,
    });
    setSelectablePreconditionOperators(operatorsForInputPreconditionObject);
  }

  function handleInputConsequenceObjectChange(selectConsequenceObject) {
    const operatorsForInputConsequenceObject = getOperatorsForDatafield({
      dataType: selectConsequenceObject.dataType,
      domainType: selectConsequenceObject.domainType,
      domainLength: selectConsequenceObject.domainValues.length,
    });
    setSelectableConsequenceOperators(operatorsForInputConsequenceObject);
  }
  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledFormLabel>
        Bezeichnung f&uuml;r die neue Regel
        <StyledFormInput
          type="text"
          id="rule_description"
          name="rule_description"
          placeholder="...für späteres Wiederfinden bitte eingeben"
          defaultValue=""
          aria-label="Eingabe eines Bezeichners für die Regel, um diese später wiederfinden zu können"
          onChange={handleFormInput}
          required
        />
      </StyledFormLabel>
      <StyledFormSection>
        <StyledFormSectionTitle>Vorbedingung</StyledFormSectionTitle>
        Hat die Regel eine Vorbedingung?
        <StyledFormLabel>
          ja
          <StyledFormInput
            type="checkbox"
            id="prompt_precondition"
            name="has_precondition"
            checked={formData.has_precondition}
            onChange={handleFormInput}
          />
        </StyledFormLabel>
        {formData.has_precondition && (
          <>
            <StyledFormSelect
              id="precondition_object"
              name="precondition_object"
              onChange={handleFormInput}
              aria-label="Auswählen, welches Datenfeld in der Vorbedingung überprüft wird"
              defaultValue=""
              required
            >
              <StyledFormSelectDefaultOption value="" disabled hidden>
                -Welches Eingabefeld soll geprüft werden?-
              </StyledFormSelectDefaultOption>
              {preconditionObjects.map((preObject) => (
                <StyledFormSelectOption key={preObject.id} value={preObject.id}>
                  {preObject.varText ? preObject.varText : preObject.varName}
                </StyledFormSelectOption>
              ))}
            </StyledFormSelect>
            <StyledFormSelect
              id="precondition_operator"
              name="precondition_operator"
              aria-label="Auswählen, welche Prüfung durchgeführt wird"
              defaultValue=""
              onChange={handleFormInput}
              required
            >
              <StyledFormSelectDefaultOption value="" disabled hidden>
                -Welche Prüfung soll erfolgen?-
              </StyledFormSelectDefaultOption>
              {selectablePrecondtionOperators.map((item) => (
                <StyledFormSelectOption
                  key={item.operator}
                  value={item.operator}
                >
                  {item.displayValue}
                </StyledFormSelectOption>
              ))}
            </StyledFormSelect>
            {["textList", "list", "valueList"].includes(
              formData.precondition_object.domainType
            ) || formData.precondition_object.dataType === "boolean" ? (
              <StyledFormSelect
                id="precondition_pattern"
                name="precondition_pattern"
                aria-label="Auswählen, welche Werte für eine erfüllte Vorbedingung vorliegen müssen"
                onChange={handleFormInput}
                required
                defaultValue={
                  formData.precondition_object.domainValues.length > 2 ? [] : ""
                }
                multiple={
                  formData.precondition_object.domainValues.length > 2
                    ? true
                    : false
                }
              >
                <StyledFormSelectDefaultOption value="" disabled hidden>
                  -Welche Werte erfüllen die Vorbedingung?-
                </StyledFormSelectDefaultOption>
                {formData.precondition_object.domainValues.map((entry) => (
                  <StyledFormSelectOption
                    key={`${formData.precondition_object.id}.${entry.value}`}
                    value={entry.value}
                  >
                    {entry?.text ? entry.text : entry.value}
                  </StyledFormSelectOption>
                ))}
              </StyledFormSelect>
            ) : (
              <StyledFormInput
                type={
                  !["textList", "list", "valueList"].includes(
                    formData.precondition_object.domainType
                  ) &&
                  formData.precondition_object.dataType === "number" &&
                  !["ni", "in"].includes(formData.precondition_operator)
                    ? "number"
                    : "text"
                }
                step={formData.precondition_object.stepValue}
                id="precondtion_pattern"
                name="precondtion_pattern"
                placeholder="Auf welchen Wert wird geprüft?"
                defaultValue=""
                aria-label="Prüfwert für Vorbedinung"
                onChange={handleFormInput}
                pattern={
                  ["ni", "in"].includes(formData.precondition_operator) &&
                  formData.precondition_object.dataType === "number" &&
                  !["textList", "list", "valueList"].includes(
                    formData.precondition_object.domainType
                  )
                    ? patternListTestNumObjects
                    : null
                }
                title={
                  ["ni", "in"].includes(formData.precondition_operator) &&
                  formData.precondition_object.dataType === "number" &&
                  !["textList", "list", "valueList"].includes(
                    formData.precondition_object.domainType
                  )
                    ? "Liste numerischer Werte getrennt durch '#'-Zeichen"
                    : null
                }
                required
              />
            )}
          </>
        )}
      </StyledFormSection>
      <StyledFormSection>
        <StyledFormSectionTitle>Ausgef&uuml;hrte Regel</StyledFormSectionTitle>
        <StyledFormLabel>
          Werte, die für das Datenfeld
          <StyledFormSelect
            id="consequence_object"
            name="consequence_object"
            onChange={handleFormInput}
            aria-label="Auswählen, welches Datenfeld bei erfüllter Vorbedingung angepasst wird"
            defaultValue=""
            required
          >
            <StyledFormSelectDefaultOption value="" disabled hidden>
              -Welches Eingabefeld soll angepasst werden?-
            </StyledFormSelectDefaultOption>
            {consequenceObjects.map((conObject) => (
              <StyledFormSelectOption key={conObject.id} value={conObject.id}>
                {conObject?.varText ? conObject.varText : conObject.varName}
              </StyledFormSelectOption>
            ))}
          </StyledFormSelect>
        </StyledFormLabel>
        <StyledFormExplanation>
          ausgewählt werden k&ouml;nnen, entsprechen folgender Regel bzw.
          unterliegen folgenden Einschr&auml;nkungen: Der Wert
        </StyledFormExplanation>
        <StyledFormSelect
          id="consequence_operator"
          name="consequence_operator"
          aria-label="Auswählen, welches Kriterium erfüllt sein muss"
          defaultValue=""
          onChange={handleFormInput}
          required
        >
          <StyledFormSelectOption value="" disabled hidden>
            -Welches Kriterium muss erf&uuml;llt sein?-
          </StyledFormSelectOption>
          {selectableConsequenceOperators.map((item) => (
            <StyledFormSelectOption key={item.operator} value={item.operator}>
              {item.displayValue}
            </StyledFormSelectOption>
          ))}
        </StyledFormSelect>
        {["textList", "list", "valueList"].includes(
          formData.consequence_object.domainType
        ) || formData.consequence_object.dataType === "boolean" ? (
          <StyledFormSelect
            id="consequence_pattern"
            name="consequence_pattern"
            aria-label="Auswählen, welche Werte für das ausgewählte Datenfeld angepasst werden"
            defaultValue=""
            required
            onChange={handleFormInput}
            multiple={
              formData.consequence_object.domainValues.length > 2 ? true : false
            }
          >
            <StyledFormSelectOption value="" disabled hidden>
              -Welche Werte werden angepasst?-
            </StyledFormSelectOption>
            {formData.consequence_object.domainValues.map((entry) => (
              <StyledFormSelectOption
                key={`${formData.consequence_object.id}.${entry.value}`}
                value={entry.value}
              >
                {entry?.text ? entry.text : entry.value}
              </StyledFormSelectOption>
            ))}
          </StyledFormSelect>
        ) : (
          <StyledFormInput
            type={
              !["textList", "list", "valueList"].includes(
                formData.consequence_object.domainType
              ) &&
              formData.consequence_object.dataType === "number" &&
              !["ni", "in"].includes(formData.consequence_operator)
                ? "number"
                : "text"
            }
            step={formData.consequence_object.stepValue}
            id="consequence_pattern"
            name="consequence_pattern"
            placeholder="Prüfwert für Auswahl möglicher Werte"
            defaultValue=""
            aria-label="Prüfwert für Auswahl möglicher Werte"
            pattern={
              ["ni", "in"].includes(formData.consequence_operator) &&
              formData.consequence_object.dataType === "number" &&
              !["textList", "list", "valueList"].includes(
                formData.consequence_object.domainType
              )
                ? patternListTestNumObjects
                : null
            }
            title={
              ["ni", "in"].includes(formData.consequence_operator) &&
              formData.consequence_object.dataType === "number" &&
              !["textList", "list", "valueList"].includes(
                formData.consequence_object.domainType
              )
                ? "Liste numerischer Werte getrennt durch '#'-Zeichen"
                : null
            }
            onChange={handleFormInput}
            required
          />
        )}
      </StyledFormSection>
      <StyledFormSubmit aria-label="Regel hinzufügen">
        Hinzufügen
      </StyledFormSubmit>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  max-width: 300px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: var(--base);
`;
const StyledFormInput = styled.input`
  max-width: 300px;
  padding: var(--3xs);
  line-height: 1.15;
  font-size: 100%;
`;
const StyledFormSelect = styled.select`
  max-width: 300px;
  padding: var(--3xs);
  line-height: 1.15;
  font-size: 100%;
`;
const StyledFormSelectOption = styled.option`
  font-style: normal;
  margin-top: var(--xs);
`;
const StyledFormSelectDefaultOption = styled.option`
  font-size: var(--md);
  margin-top: var(--xs);
`;

const StyledFormSubmit = styled.button`
  padding: var(--3xs);
  line-height: 1.15;
  font-size: 100%;
`;
const StyledFormLabel = styled.label`
  max-width: 300px;
  padding: var(--3xs);
  line-height: 1.15;
  font-size: 100%;
`;

const StyledFormSectionTitle = styled.legend`
  padding: var(--3xs);
  line-height: 1.15;
  font-size: 100%;
`;

const StyledFormExplanation = styled.p`
  max-width: 300px;
  padding: var(--3xs);
  line-height: 1.15;
  font-size: 100%;
`;

const StyledFormSection = styled.fieldset`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: var(--xs);
  border: none;
  border-top: solid;
`;
