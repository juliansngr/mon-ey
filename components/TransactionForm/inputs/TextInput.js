import styled from "styled-components";

export default function TextInput({
  name,
  placeholder,
  defaultValue,
  ariaLabel,
  required,
}) {
  return (
    <StyledInput
      type="text"
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
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
