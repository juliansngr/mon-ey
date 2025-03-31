import { useContext, createContext } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const { data, isLoading, error, mutate } = useSWR(`/api/dummy/`, fetcher);

  return (
    <TransactionsContext.Provider
      value={{
        data,
        isLoading,
        error,
        mutate,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactionsContext() {
  return useContext(TransactionsContext);
}
