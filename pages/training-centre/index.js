import useSWR from "swr";
import RulesList from "@/components/RulesList";
import RulesHeader from "@/components/RulesHeader";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function TrainingCentrePage() {
  const { data: rules, error, isLoading } = useSWR(`/api/dummy-rules`, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  //   if (!rules) return null;

  console.log(rules);
  return (
    <>
      <RulesHeader />
      <RulesList rules={rules} />
    </>
  );
}
