import RuleForm from "@/components/RuleForm";
import RulesList from "@/components/RulesList";
import RulesHeader from "@/components/RulesHeader";
import styled from "styled-components";
import { useRulebaseContext } from "@/utils/RulebaseContext/RulebaseContext";

export default function TrainingCentrePage() {
  const { rules, initializedVariables: variables } = useRulebaseContext();

  const preconditionObjects = [...variables];
  const consequenceObjects = variables.filter(
    (variable) => variable.varName !== "grandTotal"
  );

  return (
    <>
      <RulesHeader
        hasAddButton
        preconditionObjects={preconditionObjects}
        consequenceObjects={consequenceObjects}
      />
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
