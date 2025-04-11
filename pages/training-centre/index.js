import useSWR from "swr";
import RulesList from "@/components/RulesList";
import RulesHeader from "@/components/RulesHeader";
import styled from "styled-components";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function TrainingCentrePage() {
  const { data: rules, error, isLoading } = useSWR(`/api/dummy-rules`, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

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
