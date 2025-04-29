import styled from "styled-components";

export default function RadioInput({ name, options, defaultValue }) {
  return (
    <StyledRadioSection>
      {options.map((option) => (
        <div key={option.value}>
          <StyledRadio
            type="radio"
            name={name}
            id={`${name}_${option.value}`}
            value={option.value}
            disabled={option.disabled}
            defaultChecked={defaultValue === option.value}
          />
          <StyledLabel htmlFor={`${name}_${option.value}`}>
            {option.label}
          </StyledLabel>
        </div>
      ))}
    </StyledRadioSection>
  );
}

const StyledRadioSection = styled.section`
  gap: var(--base);
`;

const StyledRadio = styled.input`
  margin-right: var(--2xs);
`;

const StyledLabel = styled.label`
  padding: var(--3xs);
  line-height: 1.15;
  font-size: 100%;
`;
