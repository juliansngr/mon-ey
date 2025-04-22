import { Fingerprint } from "lucide-react";
import styled from "styled-components";

export default function RuleCard({ data }) {
  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <StyledRuleCard>
      <StyledRuleIcon />
      <div>
        <StyledRuleDescription>
          {truncateText(data.description, 30)}
        </StyledRuleDescription>
        <StyledRuleDetails>
          beregeltes Eingabefeld: {data.consequences.object}
        </StyledRuleDetails>
      </div>
    </StyledRuleCard>
  );
}

const StyledRuleCard = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
  padding: var(--md);
  border-radius: var(--xs);
  background-color: white;
  box-shadow: 0 0 0 1px #d2d2d5, 0 10px 15px -3px rgba(0, 0, 0, 0.05),
    0 4px 6px -4px rgba(0, 0, 0, 0.05);

  transition: background-color 0.3s ease;
`;

const StyledRuleIcon = styled(Fingerprint)`
  color: var(--green-500);
  width: 35px;
  height: 35px;
`;

const StyledRuleDescription = styled.p`
  font-size: var(--lg);
  font-weight: 500;
`;

const StyledRuleDetails = styled.p`
  font-size: var(--md);
  font-weight: 500;
`;
