import { getValueDecimalPlaces } from "./utils/numberUtils.js";

function applyConsequence(allVariables, consequence) {
  const consequenceValues = Array.isArray(consequence.value)
    ? consequence.value
    : [consequence.value];

  const consequenceObject = allVariables.find(
    (v) => v.varName === consequence.object
  );

  switch (consequence.operator) {
    case "==":
      switch (consequenceObject.domainType) {
        case "list":
          const excludeListValues = consequenceObject.domainValues.filter(
            (value) => !consequenceValues.includes(value)
          );
          consequenceObject.excludeValues(excludeListValues);
          break;
        case "valueList":
        case "textList":
          const excludeItemValues = consequenceObject.domainValues
            .filter((item) => !consequenceValues.includes(item.value))
            .map((item) => item.value);
          consequenceObject.excludeValues(excludeItemValues);
          break;
        case "range":
          const decimalPlaces = getValueDecimalPlaces(
            consequenceObject.stepValue
          );
          const formattedValue = parseFloat(consequence.value).toFixed(
            decimalPlaces
          );
          const formattedDomain = `${formattedValue} .. ${formattedValue}`;
          consequenceObject.DomainValues = formattedDomain;
          break;
        case "":
          consequenceObject.DomainValues = consequence.value;
          break;

        default:
          console.warn(
            `Unbekannter DomainType "${consequenceObject.domainType}".`
          );
      }
      break;
    case "!=":
      switch (consequenceObject.domainType) {
        case "valueList":
        case "textList":
          const excludeItemValues = consequenceObject.domainValues
            .filter((item) => item.value === consequence.value)
            .map((item) => item.value);
          consequenceObject.excludeValues(excludeItemValues);
          break;
        case "list":
        case "":
          consequenceObject.excludeValues(consequence.value);
          break;
        default:
          console.warn(
            `Unbekannter DomainType "${consequenceObject.domainType}".`
          );
      }
      break;
    case ">":
      switch (consequenceObject.domainType) {
        case "list":
          const excludeListValues = consequenceObject.domainValues.filter(
            (value) => value <= consequence.value
          );
          consequenceObject.excludeValues(excludeListValues);
          break;
        case "valueList":
        case "textList":
          const excludeItemValues = consequenceObject.domainValues
            .filter((item) => item.value <= consequence.value)
            .map((item) => item.value);
          consequenceObject.excludeValues(excludeItemValues);
          break;
        case "":
        case "range":
          let newMin = 0.0;
          if (consequenceObject.stepValue) {
            const decimalPlaces = getValueDecimalPlaces(
              consequenceObject.stepValue
            );
            newMin = (
              parseFloat(consequence.value) - consequenceObject.stepValue
            ).toFixed(decimalPlaces);
          } else {
            newMin = parseFloat(consequence.value) - Number.MIN_VALUE;
          }
          const rangeRegex = /^\s*(\-?\d*\.?\d*)\s*\.\.\s*(\-?\d*\.?\d*)\s*$/;
          const match = consequenceObject.domainValues.match(rangeRegex);
          const [, currentMin, currentMax] = match; // min und max extrahieren
          if (
            currentMin === undefined ||
            currentMin === "" ||
            currentMin === null ||
            newMin > currentMin
          ) {
            consequenceObject.domainValues = `${newMin} .. ${currentMax}`;
          }
          break;
        default:
          console.warn(
            `Unbekannter DomainType "${consequenceObject.domainType}".`
          );
      }
      break;
    case "<":
      switch (consequenceObject.domainType) {
        case "list":
          const excludeListValues = consequenceObject.domainValues.filter(
            (value) => value >= consequence.value
          );
          consequenceObject.excludeValues(excludeListValues);
          break;
        case "valueList":
        case "textList":
          const excludeItemValues = consequenceObject.domainValues
            .filter((item) => item.value >= consequence.value)
            .map((item) => item.value);
          consequenceObject.excludeValues(excludeItemValues);
          break;
        case "":
        case "range":
          let newMax = 0.0;
          if (consequenceObject.stepValue) {
            const decimalPlaces = getValueDecimalPlaces(
              consequenceObject.stepValue
            );

            newMax = (
              parseFloat(consequence.value) - consequenceObject.stepValue
            ).toFixed(decimalPlaces);
          } else {
            newMax = parseFloat(consequence.value) - Number.MIN_VALUE;
          }
          const rangeRegex = /^\s*(\-?\d*\.?\d*)\s*\.\.\s*(\-?\d*\.?\d*)\s*$/;
          const match = consequenceObject.domainValues.match(rangeRegex);
          const [, currentMin, currentMax] = match; // min und max extrahieren
          if (
            currentMax === undefined ||
            currentMax === "" ||
            currentMax === null ||
            newMax < currentMax
          ) {
            consequenceObject.domainValues = `${currentMin} .. ${newMax}`;
          }
          break;
        default:
          console.warn(
            `Unbekannter DomainType "${consequenceObject.domainType}".`
          );
      }
      break;
    case ">=":
      switch (consequenceObject.domainType) {
        case "list":
          const excludeListValues = consequenceObject.domainValues.filter(
            (value) => value < consequence.value
          );
          consequenceObject.excludeValues(excludeListValues);
          break;
        case "valueList":
        case "textList":
          const excludeItemValues = consequenceObject.domainValues
            .filter((item) => item.value < consequence.value)
            .map((item) => item.value);
          consequenceObject.excludeValues(excludeItemValues);
          break;
        case "":
        case "range":
          let newMin = parseFloat(consequence.value);
          const rangeRegex = /^\s*(\-?\d*\.?\d*)\s*\.\.\s*(\-?\d*\.?\d*)\s*$/;
          const match = consequenceObject.domainValues.match(rangeRegex);
          const [, currentMin, currentMax] = match; // min und max extrahieren
          if (
            currentMin === undefined ||
            currentMin === "" ||
            currentMin === null ||
            newMin > currentMin
          ) {
            consequenceObject.domainValues = `${newMin} .. ${currentMax}`;
          }
          break;
        default:
          console.warn(
            `Unbekannter DomainType "${consequenceObject.domainType}".`
          );
      }
      break;
    case "=<":
      switch (consequenceObject.domainType) {
        case "list":
          const excludeListValues = consequenceObject.domainValues.filter(
            (value) => value > consequence.value
          );
          consequenceObject.excludeValues(excludeListValues);
          break;
        case "valueList":
        case "textList":
          const excludeItemValues = consequenceObject.domainValues
            .filter((item) => item.value > consequence.value)
            .map((item) => item.value);
          consequenceObject.excludeValues(excludeItemValues);
          break;
        case "":
        case "range":
          let newMax = parseFloat(consequence.value);
          const rangeRegex = /^\s*(\-?\d*\.?\d*)\s*\.\.\s*(\-?\d*\.?\d*)\s*$/;
          const match = consequenceObject.domainValues.match(rangeRegex);
          const [, currentMin, currentMax] = match; // min und max extrahieren
          if (
            currentMax === undefined ||
            currentMax === "" ||
            currentMax === null ||
            newMax < currentMax
          ) {
            consequenceObject.domainValues = `${currentMin} .. ${newMax}`;
          }
          break;
        default:
          console.warn(
            `Unbekannter DomainType "${consequenceObject.domainType}".`
          );
      }
      break;
    case "in":
      switch (consequenceObject.domainType) {
        case "list":
          const excludeListValues = consequenceObject.domainValues.filter(
            (domainValue) => !consequence.value.includes(domainValue)
          );
          consequenceObject.excludeValues(excludeListValues);
          break;
        case "valueList":
        case "textList":
          const excludeItemValues = consequenceObject.domainValues
            .filter(
              (domainItem) => !consequence.value.includes(domainItem.value)
            )
            .map((item) => item.value);
          consequenceObject.excludeValues(excludeItemValues);
          break;
        case "":
        case "range":
          consequenceObject.domainValues = consequence.value;
          break;
        default:
          console.warn(
            `Unbekannter DomainType "${consequenceObject.domainType}".`
          );
      }
    case "ni":
      switch (consequenceObject.domainType) {
        case "valueList":
        case "textList":
          const excludeItemValues = consequenceObject.domainValues
            .filter((item) => consequence.value.includes(item.value))
            .map((item) => item.value);
          consequenceObject.excludeValues(excludeItemValues);
        case "list":
        case "":
        case "range":
          consequenceObject.excludeValues(consequence.value);
          break;
        default:
          console.warn(
            `Unbekannter DomainType "${consequenceObject.domainType}".`
          );
          break;
      }
    default:
      console.warn(
        `Unbekannter Consequence-Operator "${consequence.operator}".`
      );
      break;
  }
}

export { applyConsequence };
