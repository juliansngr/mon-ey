import { uid } from "uid";
import { userVariable } from "./models/variables.js";

export function initializeUserVariables(userVariablesData) {
  return userVariablesData.map((userVariableDataset) => {
    const userVarId = uid();
    return new userVariable({
      id: userVarId,
      varName: userVariableDataset.varName,
      varText: userVariableDataset.varText,
      dataType: userVariableDataset.dataType,
      fieldName: userVariableDataset.dbFieldName,
      varPlaceholder: userVariableDataset.varPlaceholder,
      varAriaLabel: userVariableDataset.varAriaLabel,
      stepValue: userVariableDataset.stepValue,
      initialValue: userVariableDataset.initialValue,
      currentValue: userVariableDataset.initialValue,
      isMandatory: userVariableDataset.isMandatory,
      domainType: userVariableDataset.domainType,
      domainValues: userVariableDataset.domainValues,
    });
  });
}
