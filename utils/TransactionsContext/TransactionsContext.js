import { useContext, createContext } from "react";
import { groupTransactions } from "@/utils/FilterFunctionsLib/filterFunctions";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const { data, isLoading, error, mutate } = useSWR(`/api/dummy/`, fetcher);

  if (isLoading) {
    return null;
  }

  if (!data) {
    return null;
  }
  const sortedEntries = groupTransactions(data);

  return (
    <TransactionsContext.Provider
      value={{
        data,
        isLoading,
        error,
        mutate,
        sortedEntries,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactionsContext() {
  return useContext(TransactionsContext);
}
