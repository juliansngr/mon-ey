export function evaluateCondition(variableValue, operator, conditionValue) {
  const conditionArray = Array.isArray(conditionValue)
    ? conditionValue
    : [conditionValue];

  switch (operator) {
    case "==":
      return conditionArray.some((value) => variableValue === value);
    case "!=":
      return conditionArray.every((value) => variableValue !== value);
    case ">":
      return conditionArray.every(
        (value) => parseFloat(variableValue) > parseFloat(value)
      );
    case "<":
      return conditionArray.every(
        (value) => parseFloat(variableValue) < parseFloat(value)
      );
    case ">=":
      return conditionArray.every(
        (value) => parseFloat(variableValue) >= parseFloat(value)
      );
    case "=<":
      return conditionArray.every(
        (value) => parseFloat(variableValue) <= parseFloat(value)
      );
    case "in":
      return conditionArray.includes(variableValue);
    case "ni":
      return !conditionArray.includes(variableValue);
    default:
      console.warn(`Unbekannter Operator "${operator}".`);
      return false;
  }
}
