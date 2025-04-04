import { useContext, createContext } from "react";
import { groupTransactions } from "@/utils/FilterFunctionsLib/filterFunctions";
import useSWR from "swr";
import dayjs from "dayjs";

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

  // const dataFixed = Object.groupBy(data, (transaction) => transaction.date);

  // const sortedEntries = Object.entries(dataFixed).sort(
  //   ([dateA], [dateB]) => dayjs(dateB).valueOf() - dayjs(dateA).valueOf()
  // );

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
