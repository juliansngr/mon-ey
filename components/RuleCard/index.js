import { Fingerprint } from "lucide-react";
import styled from "styled-components";

export default function RuleCard({ data }) {
  console.log(data);
  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <StyledRuleCard>
      <IconTextWrapper>
        <StyledRuleIcon />
        <div>
          <StyledRuleDescription>
            {truncateText(data.description, 30)}
          </StyledRuleDescription>
          <StyledRuleDetails>
            beregeltes Eingabefeld: {data.consequences.object}
          </StyledRuleDetails>
        </div>
      </IconTextWrapper>
    </StyledRuleCard>
  );
}

const StyledRuleCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--md);
  border-radius: var(--xs);
  background-color: white;
  box-shadow: 0 0 0 1px #d2d2d5, 0 10px 15px -3px rgba(0, 0, 0, 0.05),
    0 4px 6px -4px rgba(0, 0, 0, 0.05);

  transition: background-color 0.3s ease;
`;

const StyledAmount = styled.p`
  font-size: var(--lg);
  font-weight: 500;
  color: ${(props) =>
    props.$type === "income" ? `var(--green-500)` : `var(--red-500)`};
`;

const StyledRuleIcon = styled(Fingerprint)`
  color: var(--green-500);
  width: 35px;
  height: 35px;
`;

const IconTextWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledRuleDescription = styled.p`
  font-size: var(--lg);
  font-weight: 500;
`;

const StyledRuleDetails = styled.p`
  font-size: var(--md);
  font-weight: 500;
`;
