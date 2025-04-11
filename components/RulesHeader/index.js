import styled from "styled-components";

export default function RulesHeader() {
  return (
    <StyledHeaderWrapper>
      <StyledH2>Regeln</StyledH2>
    </StyledHeaderWrapper>
  );
}

const StyledH2 = styled.h2`
  font-size: var(--2xl);
  margin-bottom: 1rem;
`;

const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
