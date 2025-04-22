import { initializeUserVariables } from "../../utils/RulebaseFunctionsLib/rulebaseFunctions";
import { createContext, useContext, useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const RulebaseContext = createContext();

export function RulebaseProvider({ children }) {
  const {
    data: rules,
    isLoading: rulesLoading,
    error: rulesError,
    mutate: mutateRules,
  } = useSWR(`/api/dummy-rules/`, fetcher);

  const {
    data: variables,
    isLoading: variablesLoading,
    error: variablesError,
    mutate: mutateVariables,
  } = useSWR(`/api/dummy-variables/`, fetcher);

  const isLoading = rulesLoading || variablesLoading;
  const error = rulesError || variablesError;

  if (isLoading) {
    return null;
  }

  if (!rules || !variables) {
    return null;
  }

  const initializedVariables = initializeUserVariables(variables);

  const preconditionObjects = [...initializedVariables];
  const consequenceObjects = initializedVariables.filter(
    (variable) => variable.varName !== "grandTotal"
  );

  return (
    <RulebaseContext.Provider
      value={{
        rules,
        initializedVariables,
        preconditionObjects,
        consequenceObjects,
        isLoading,
        error,
        mutateRules,
        mutateVariables,
      }}
    >
      {children}
    </RulebaseContext.Provider>
  );
}

export function useRulebaseContext() {
  return useContext(RulebaseContext);
}
