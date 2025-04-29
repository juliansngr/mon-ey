export async function handleRuleAdd(
  event,
  { mutateRules, closeModal, initializedVariables }
) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const ruleData = {};
  for (const [key, value] of formData.entries()) {
    if (key === "precondition_pattern" || key === "consequence_pattern") {
      ruleData[key] = formData.getAll(key);
    } else {
      ruleData[key] = value;
    }
  }

  console.log("Rule data:", ruleData);

  if (ruleData.has_precondition) {
    const preconditionObject = initializedVariables.find(
      (item) => item._id === ruleData.precondition_object
    );
    ruleData.preconditions = [
      {
        id: "1",
        object: preconditionObject.varName,
        operator: ruleData.precondition_operator,
        pattern: Array.isArray(ruleData.precondition_pattern)
          ? ruleData.precondition_pattern
          : [ruleData.precondition_pattern],
        connectOperator: undefined,
        connectId: undefined,
      },
    ];
  }
  const consequenceObject = initializedVariables.find(
    (item) => item._id === ruleData.consequence_object
  );
  const newRuleDbItemData = {
    description: ruleData.rule_description,
    preconditions: ruleData.preconditions || [],
    consequences: {
      object: consequenceObject?.varName,
      operator: ruleData.consequence_operator,
      value: Array.isArray(ruleData.consequence_pattern)
        ? ruleData.consequence_pattern
        : [ruleData.consequence_pattern],
    },
  };

  if (
    (ruleData.consequence_operator === "in" ||
      ruleData.consequence_operator === "ni") &&
    !["list", "textList", "valueList"].includes.consequenceObject.domainType
  ) {
    const formattedDomainValues =
      ruleData.consequence_pattern.match(/([^#]+)/g);

    newRuleDbItemData.consequences = {
      object: consequenceObject.varName,
      operator: ruleData.consequence_operator,
      value: Array.isArray(formattedDomainValues)
        ? formattedDomainValues
        : [formattedDomainValues],
    };
  }
  console.log("New rule DB item data:", newRuleDbItemData);
  const response = await fetch("/api/rules", {
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
