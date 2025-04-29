import RulesList from "@/components/RulesList";
import RulesHeader from "@/components/RulesHeader";
import styled from "styled-components";
import { useRulebaseContext } from "@/contexts/RulebaseContext/RulebaseContext";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function TrainingCentrePage() {
  const { rules } = useRulebaseContext();

  return (
    <>
      <IconLink href={"/profile"}>
        <ChevronLeft />
        Zurück
      </IconLink>
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
const IconLink = styled(Link)`
  all: unset;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-self: start;
`;
