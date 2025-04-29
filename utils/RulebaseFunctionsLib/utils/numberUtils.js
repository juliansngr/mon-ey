export function getValueDecimalPlaces(value) {
  if (!value) return 0;

  const stringValue = value.toString().trim();
  const decimalPart = stringValue.split(".")[1];

  if (!decimalPart) return 0;

  return decimalPart.length;
}
