import styled from "styled-components";

export default function NumberInput({
  name,
  placeholder,
  defaultValue,
  step,
  min,
  max,
  ariaLabel,
  required,
}) {
  return (
    <StyledInput
      type="number"
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      step={step}
      min={min}
      max={max}
      aria-label={ariaLabel}
      required={required}
    />
  );
}

const StyledInput = styled.input`
  padding: var(--3xs);
  line-height: 1.15;
  font-size: 100%;
`;
