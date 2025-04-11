import styled from "styled-components";
import RuleCard from "../RuleCard";

export default function RulesList({ rules }) {
  return (
    <StyledUl>
      {rules.map((rule) => (
        <StyledLi key={rule.id}>
          <RuleCard data={rule}></RuleCard>
        </StyledLi>
      ))}
    </StyledUl>
  );
}

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: var(--xs);
`;
const StyledLi = styled.li``;
