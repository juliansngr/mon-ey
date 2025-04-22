import RulesList from "@/components/RulesList";
import RulesHeader from "@/components/RulesHeader";
import styled from "styled-components";
import { useRulebaseContext } from "@/utils/RulebaseContext/RulebaseContext";

export default function TrainingCentrePage() {
  const { rules } = useRulebaseContext();

  return (
    <>
      <RulesHeader />
      {rules.length > 0 ? (
        <RulesList rules={rules} />
      ) : (
        <NoRulesText>Keine Regeln vorhanden.</NoRulesText>
      )}
    </>
  );
}

const NoRulesText = styled.p`
  text-align: center;
`;
