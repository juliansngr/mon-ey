import { initializeUserVariables } from "@/utils/RulebaseFunctionsLib/index.js";
import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { applyRulesToUserVariables } from "@/utils/RulebaseFunctionsLib/index.js";
import { useTransactionsContext } from "../TransactionsContext/TransactionsContext";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const RulebaseContext = createContext();

export function RulebaseProvider({ children }) {
  const { data: transactions } = useTransactionsContext();
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

  let accountGrandTotal = 0.0;
  for (const transaction of transactions) {
    accountGrandTotal += transaction.amount;
  }
  const [initializedVariables, setInitializedVariables] = useState([]);
  const isLoading = rulesLoading || variablesLoading;
  const error = rulesError || variablesError;
  useEffect(() => {
    if (variables && rules) {
      const initializedVars = initializeUserVariables(variables);

      const grandTotalVar = initializedVars.find(
        (variable) => variable.varName === "grandTotal"
      );
      if (grandTotalVar) {
        grandTotalVar.currentValue = accountGrandTotal;
      }
      applyRulesToUserVariables({ variables: initializedVars, rules: rules });
      setInitializedVariables(initializedVars);
    }
  }, [variables, rules, transactions, accountGrandTotal]);

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
  variable;
}

export function useRulebaseContext() {
  return useContext(RulebaseContext);
}
