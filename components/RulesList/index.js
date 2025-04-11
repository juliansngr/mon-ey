import styled from "styled-components";
import RuleCard from "../RuleCard";

export default function RulesList({ rules }) {
  console.log(rules);
  return (
    <>
      <StyledUl>
        {rules.length === 0 && (
          <NoRulesText>Keine Regeln vorhanden.</NoRulesText>
        )}
        {rules.map((rule) => (
          <StyledLi key={rule.id}>
            <RuleCard data={rule}></RuleCard>
          </StyledLi>
        ))}
      </StyledUl>
    </>
  );
}

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: var(--xs);
`;

const StyledLi = styled.li`
  display: flex;
  flex-direction: column;
  gap: var(--3xs);
`;

const NoRulesText = styled.p`
  text-align: center;
`;
