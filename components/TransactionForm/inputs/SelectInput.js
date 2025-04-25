import styled from "styled-components";

export default function SelectInput({
  name,
  options,
  defaultValue,
  ariaLabel,
  required,
}) {
  return (
    <StyledSelect
      name={name}
      defaultValue={defaultValue}
      aria-label={ariaLabel}
      required={required}
    >
      {options.map((option) => (
        <StyledOption
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          hidden={option.hidden}
        >
          {option.label}
        </StyledOption>
      ))}
    </StyledSelect>
  );
}

const StyledSelect = styled.select`
  padding: var(--3xs);
  line-height: 1.15;
  font-size: 100%;
`;

const StyledOption = styled.option``;
