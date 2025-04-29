import { getValueDecimalPlaces } from "../utils/numberUtils";

class userVariable {
  constructor({
    id = undefined,
    varName = undefined,
    fieldName = undefined,
    varText = undefined,
    varAriaLabel = undefined,
    varPlaceholder = undefined,
    initialValue = undefined,
    stepValue = undefined,
    currentValue = undefined,
    dataType = undefined,
    isMandatory = false,
    domainType = undefined,
    domainValues = [],
    excludedDomainValues = [],
    deferredDomainValues = [],
    preferredDomainValues = [],
  } = {}) {
    this._id = id;
    this._varName = varName;
    this._varText = varText;
    this._fieldName = fieldName;
    this._varAriaLabel = varAriaLabel;
    this._varPlaceholder = varPlaceholder;
    this._currentValue = currentValue;
    this._initialValue = initialValue;
    this._stepValue = stepValue;
    this._dataType = dataType;
    this._isMandatory = isMandatory;
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

  get isMandatory() {
    return this._isMandatory;
  }

  get id() {
    return this._id;
  }

  get currentValue() {
    return this._currentValue;
  }
  get initialValue() {
    return this._initialValue;
  }

  get varText() {
    return this._varText;
  }

  get fieldName() {
    return this._fieldName;
  }

  get varAriaLabel() {
    return this._varAriaLabel;
  }
  get varPlaceholder() {
    return this._varPlaceholder;
  }

  get stepValue() {
    return this._stepValue;
  }

  get domainValues() {
    return this._domainValues;
  }

  get excludedDomainValues() {
    return this._excludedDomainValues;
  }

  set currentValue(newCurrentValue) {
    if (typeof newCurrentValue !== this._dataType && newCurrentValue !== null) {
      throw new Error(`Der neue Wert muss vom Typ "${this._dataType}" sein.`);
    }

    if (this._excludedDomainValues.includes(newCurrentValue)) {
      throw new Error(`Der neue Wert "${newCurrentValue}" ist ausgeschlossen.`);
    }
    this._currentValue = newCurrentValue;
  }
  set domainValues(newDomainValues) {
    if (this._domainType === "range") {
      // Extrahieren von min und max aus dem Bereich "min .. max", "min ..", " .. max"
      const rangeRegex = /^\s*(\-?\d*\.?\d*)\s*\.\.\s*(\-?\d*\.?\d*)\s*$/;
      const match = newDomainValues.match(rangeRegex);
      if (!match) {
        throw new Error(
          `domainValues muss im Format "min .. max", "min .." oder " .. max" angegeben werden.`
        );
      }

      const [, min, max] = match; // min und max extrahieren

      // Anzahl der Dezimalstellen aus stepValue ermitteln
      const decimalPlaces = getValueDecimalPlaces(this._stepValue);
      // Prüfen und Formatieren von min
      if (min && !isNaN(min)) {
        const formattedMin = parseFloat(min).toFixed(decimalPlaces);
        if (formattedMin !== min) {
          throw new Error(
            `Der Wert "min" (${min}) muss ${decimalPlaces} Dezimalstellen haben.`
          );
        }
      }

      // Prüfen und Formatieren von max
      if (max && !isNaN(max)) {
        const formattedMax = parseFloat(max).toFixed(decimalPlaces);

        if (formattedMax !== max) {
          throw new Error(
            `Der Wert "max" (${max}) muss ${decimalPlaces} Dezimalstellen haben.`
          );
        }
      }
    } else {
      newDomainValues.every((value) => {
        if (typeof value !== this._dataType) {
          throw new Error(
            `Alle Werte in domainValues müssen dem Datentyp "${this._dataType}" entsprechen.`
          );
        }
      });
      if (["list", "valueList", "textList"].includes(this._domainType)) {
        if (!Array.isArray(newDomainValues)) {
          throw new Error(`domainValues muss ein Array sein.`);
        }
      }
    }
    this._domainValues = newDomainValues;
  }

  excludeValues(valuesToExclude) {
    if (this._domainType === "range") {
      throw new Error(
        `Der DomainType "${this._domainType}" unterstützt keine excludedDomainValues.`
      );
    }

    const valuesToExcludeArray = Array.isArray(valuesToExclude)
      ? valuesToExclude
      : [valuesToExclude];

    const hasInvalidTypes = valuesToExcludeArray.some(
      (value) => typeof value !== this._dataType
    );

    if (hasInvalidTypes) {
      throw new Error(
        `Alle Werte in excludedDomainValues müssen dem Datentyp "${this._dataType}" entsprechen.`
      );
    }
    this._excludedDomainValues = [
      ...new Set([...this._excludedDomainValues, ...valuesToExcludeArray]),
    ];
  }
}

export { userVariable };
