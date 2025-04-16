import { userRule } from "../RulebaseFunctionsLib/rulebaseFunctions";

export async function handleRuleAdd(
  event,
  { mutateRules, closeModal, initializedVariables }
) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const ruleData = Object.fromEntries(formData);

  if (ruleData.has_precondition) {
    const preconditionObject = initializedVariables.find(
      (item) => item._id === ruleData.precondition_object
    );
    ruleData.precondtions = [
      {
        id: "1",
        object: preconditionObject.varName,
        operator: ruleData.precondition_operator,
        pattern: ruleData.precondition,
        connectOperator: undefined,
        connectId: undefined,
      },
    ];
  }
  const consequenceObject = initializedVariables.find(
    (item) => item._id === ruleData.consequence_object
  );
  const newRuleData = new userRule({
    description: ruleData.rule_description,
    precondtions: ruleData.precondtions,
    consequences_object: consequenceObject.varName,
    consequences_operator: ruleData.consequence_operator,
    consequences_value: ruleData.consequence_pattern,
  });

  const newRuleDbItemData = newRuleData.ruleData;

  const response = await fetch("/api/dummy-rules", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRuleDbItemData),
  });
  if (response.ok) {
    mutateRules();
    closeModal();
  }

  if (!response.ok) {
    closeModal();
  }
}
