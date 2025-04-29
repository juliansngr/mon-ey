import { evaluateCondition } from "./conditionEvaluation.js";
import { applyConsequence } from "./consequenceHandling.js";

function applyRulesToUserVariables({ variables, rules }) {
  variables.forEach((variable) => {
    const matchingRules = rules.filter(
      (rule) => rule.consequences.object === variable.varName
    );

    matchingRules.forEach((rule) => {
      let isPreconditionMet = false;

      if (rule.preconditions && rule.preconditions.length > 0) {
        isPreconditionMet = rule.preconditions.every((precondition) => {
          const relatedVariable = variables.find(
            (v) => v.varName === precondition.object
          );

          if (!relatedVariable) {
            console.warn(
              `Precondition-Variable "${precondition.object}" nicht gefunden.`
            );
            return false;
          }

          return evaluateCondition(
            relatedVariable.currentValue,
            precondition.operator,
            precondition.pattern
          );
        });
      } else {
        isPreconditionMet = true; // Wenn keine Precondition existiert, gilt sie als erfüllt
      }
      if (isPreconditionMet) {
        applyConsequence(variables, rule.consequences);
      }
    });
  });
}

export { applyRulesToUserVariables };
