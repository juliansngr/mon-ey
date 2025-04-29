function getUiInputFromVariables({ inputVariables, initializedVariables }) {
  const uiInput = [];
  inputVariables.forEach((variable) => {
    const variableId = initializedVariables.find((v) => v.varName === variable);
    if (!variableId) {
      console.error(
        `Variable ${variable} nicht in den initialisierten Variablen gefunden.`
      );
      return;
    }
    const variableDataType = variableId.dataType;
    const variableDomainType = variableId.domainType;

    const variablePlaceholder = variableId.varPlaceholder
      ? variableId.varPlaceholder
      : variableId.varText;

    const variableInputName = variableId.fieldName
      ? variableId.fieldName
      : variableId.varName;

    const variableIsRequired = variableId.isMandatory ? true : false;

    let variableDomainTypeCheck = variableDomainType;

    if (
      ["list", "textList", "valueList"].includes(variableDomainType) &&
      variableId.domainValues.length <= 2
    ) {
      variableDomainTypeCheck = `${variableDomainType}-short`;
    }

    const variableInputType = `${variableDataType}-${variableDomainTypeCheck}`;

    switch (variableInputType) {
      default:
        uiInput.push({
          id: variableId.id,
          name: variableInputName,
          type: "text",
          placeholder: variablePlaceholder,
          name: variableInputName,
          required: variableIsRequired,
          ariaLabel: variableId.varAriaLabel,
        });
        break;
      case "number-":
      case "number-range":
        const textStepValue = variableId.stepValue ? variableId.stepValue : "";
        let textMinValue = "";
        let textMaxValue = "";

        if (variableId.domainType === "range") {
          const rangeRegex = /^\s*(\-?\d*\.?\d*)\s*\.\.\s*(\-?\d*\.?\d*)\s*$/;
          const match = variableId.domainValues.match(rangeRegex);
          const [, DomainMin, DomainMax] = match;
          if (DomainMin) {
            textMinValue = DomainMin;
          }
          if (DomainMax) {
            textMaxValue = DomainMax;
          }
        }

        uiInput.push({
          id: variableId.id,
          type: "number",
          name: variableInputName,
          placeholder: variablePlaceholder,
          step: textStepValue,
          min: textMinValue,
          max: textMaxValue,
          required: variableIsRequired,
          ariaLabel: variableId.varAriaLabel,
        });
        break;
      case "boolean-":
        uiInput.push({
          id: variableId.id,
          type: "checkbox",
          name: variableInputName,
          label: variableId.varText,
          value: variableId.currentValue,
          required: variableIsRequired,
          ariaLabel: variableId.varAriaLabel,
        });
        break;
      case "number-list":
      case "string-list":
        const variableListOptions = variableId.domainValues.map((option) => ({
          value: option.value,
          label: option.value,
          disabled: variableId.excludedDomainValues.includes(option.value),
        }));
        if (!variableId.domainValues.includes(variableId.initialValue)) {
          variableListOptions.unshift({
            value: "",
            label: variablePlaceholder,
            disabled: true,
            hidden: true,
          });
        }
        uiInput.push({
          id: variableId.id,
          name: variableInputName,
          type: "select",
          name: variableInputName,
          required: variableIsRequired,
          options: variableListOptions,
          ariaLabel: variableId.varAriaLabel,
        });
        break;
      case "number-valueList":
      case "string-textList":
      case "string-valueList":
        const variableOptions = variableId.domainValues.map((option) => ({
          value: option.value,
          label: option.text,
          disabled: variableId.excludedDomainValues.includes(option.value),
        }));
        if (!variableId.domainValues.includes(variableId.initialValue)) {
          variableOptions.unshift({
            value: "",
            label: variablePlaceholder,
            disabled: true,
            hidden: true,
          });
        }
        uiInput.push({
          id: variableId.id,
          name: variableInputName,
          type: "select",
          name: variableInputName,
          required: variableIsRequired,
          options: variableOptions,
          ariaLabel: variableId.varAriaLabel,
        });
        break;
      case "number-valueList-short":
      case "string-textList-short":
      case "string-valueList-short": {
        const variableRadioOptions = variableId.domainValues.map((option) => ({
          value: option.value,
          label: option.text,
          disabled: variableId.excludedDomainValues.includes(option.value),
        }));
        uiInput.push({
          id: variableId.id,
          name: variableInputName,
          type: "radio",
          name: variableInputName,
          required: variableIsRequired,
          options: variableRadioOptions,
          ariaLabel: variableId.varAriaLabel,
        });
        break;
      }
    }
  });
  return uiInput;
}

export { getUiInputFromVariables };
