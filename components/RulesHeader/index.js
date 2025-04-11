import styled from "styled-components";

export default function RulesHeader() {
  return (
    <>
      <StyledHeaderWrapper>
        <StyledH2>Regeln</StyledH2>
      </StyledHeaderWrapper>
    </>
  );
}

const StyledH2 = styled.h2`
  font-size: var(--2xl);
  margin-bottom: 1rem;
`;

const StyledAddButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--green-500);
  width: 2.25rem;
  height: 2.25rem;
  cursor: pointer;
`;

const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
