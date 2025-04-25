import { uid } from "uid";

class userVariable {
  constructor({
    id = undefined,
    varName = undefined,
    varText = undefined,
    initialValue = undefined,
    stepValue = undefined,
    currentValue = undefined,
    dataType = undefined,
    domainType = undefined,
    domainValues = undefined,
    excludedDomainValues = undefined,
    deferredDomainValues = undefined,
    preferredDomainValues = undefined,
  } = {}) {
    this._id = id;
    this._varName = varName;
    this._varText = varText;
    this._currentValue = currentValue;
    this._initialValue = initialValue;
    this._stepValue = stepValue;
    this._dataType = dataType;
    this._domainType = domainType;
    this._domainValues = domainValues;
    this._excludedDomainValues = excludedDomainValues;
    this._deferredDomainValues = deferredDomainValues;
    this._preferredDomainValues = preferredDomainValues;
  }
  get varName() {
    return this._varName;
  }

  get dataType() {
    return this._dataType;
  }

  get domainType() {
    return this._domainType;
  }

  get id() {
    return this._id;
  }

  get varText() {
    return this._varText;
  }

  get stepValue() {
    return this._stepValue;
  }

  get domainValues() {
    return this._domainValues;
  }
}

class userRule {
  constructor({
    description = undefined,
    precondtions = [],
    consequences_object = undefined,
    consequences_operator = undefined,
    consequences_value = undefined,
  } = {}) {
    this._id = uid();
    this._description = description;
    this._preconditions = precondtions;
    this._consequences = {
      object: consequences_object,
      operator: consequences_operator,
      value: consequences_value,
    };
  }
  get rulePrecondtions() {
    return this._preconditions;
  }

  get ruleDescription() {
    return this._description;
  }

  get ruleConsequence() {
    return this._consequences;
  }

  get ruleData() {
    return {
      id: this._id,
      description: this._description,
      precondtions: this._preconditions,
      consequences: this._consequences,
    };
  }

  get id() {
    return this._id;
  }
}

function initializeUserVariables(userVariablesData) {
  return userVariablesData.map((userVariableDataset) => {
    const userVarId = uid();
    return new userVariable({
      id: userVarId,
      varName: userVariableDataset.varName,
      varText: userVariableDataset.varText,
      dataType: userVariableDataset.dataType,
      initialValue: userVariableDataset.initialValue,
      isMandatory: userVariableDataset.initialValue,
      domainType: userVariableDataset.domainType,
      domainValues: userVariableDataset.domainValues,
    });
  });
}

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
    default:
      return operators;
  }
}

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
    displayValue: "darf nicht enthalten sein in / ist keiner der Werte von",
  },
];

export {
  operators,
  userRule,
  initializeUserVariables,
  getOperatorsForDatafield,
};
