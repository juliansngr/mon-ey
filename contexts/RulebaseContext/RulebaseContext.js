import { initializeUserVariables } from "../../utils/RulebaseFunctionsLib/rulebaseFunctions";
import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const RulebaseContext = createContext();

export function RulebaseProvider({ children }) {
  const { data: session, status } = useSession();
  const {
    data: rules,
    isLoading: rulesLoading,
    error: rulesError,
    mutate: mutateRules,
  } = useSWR(status === "authenticated" ? "/api/rules" : null, fetcher);

  const {
    data: variables,
    isLoading: variablesLoading,
    error: variablesError,
    mutate: mutateVariables,
  } = useSWR(`/api/dummy-variables/`, fetcher);

  const [initializedVariables, setInitializedVariables] = useState([]);
  const isLoading = rulesLoading || variablesLoading;
  const error = rulesError || variablesError;
  useEffect(() => {
    if (variables) {
      const initializedVars = initializeUserVariables(variables);
      setInitializedVariables(initializedVars);
    }
  }, [variables]);

  if (isLoading) {
    return null;
  }

  if (!rules || !variables) {
    return null;
  }

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
