import styled from "styled-components";

export default function DateInput({ name, defaultValue, ariaLabel, required }) {
  return (
    <StyledInput
      type="datetime-local"
      name={name}
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
