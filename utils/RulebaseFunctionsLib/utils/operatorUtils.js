import { operators } from "../constants.js";

function getOperatorsForDatafield({
  dataType,
  domainType = undefined,
  domainLength = undefined,
}) {
  switch (dataType) {
    case "string":
      if (["textList", "list", "valueList"].includes(domainType)) {
        if (domainLength > 2) {
          return operators.filter((item) =>
            ["==", "!=", "in", "ni"].includes(item.operator)
          );
        } else {
          return operators.filter((item) =>
            ["==", "!="].includes(item.operator)
          );
        }
      } else {
        return operators.filter((item) => ["==", "!="].includes(item.operator));
      }
    case "boolean":
      return operators.filter((item) => ["==", "!="].includes(item.operator));

    case "number":
      if (domainType === "range") {
        const filteredOperators = operators.filter(
          (item) => !["!=", "in", "ni"].includes(item.operator)
        );

        return filteredOperators;
      } else {
        return operators;
      }
    default:
      return operators;
  }
}

export { getOperatorsForDatafield };
