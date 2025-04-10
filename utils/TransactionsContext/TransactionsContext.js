import {
  filterTransactions,
  groupTransactions,
} from "@/utils/FilterFunctionsLib/filterFunctions";
import { createContext, useContext, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const { data, isLoading, error, mutate } = useSWR(`/api/dummy/`, fetcher);
  const [activeFilter, setActiveFilter] = useState({
    type: null,
    pattern: null,
  });

  if (isLoading) {
    return null;
  }

  if (!data) {
    return null;
  }

  const handleFilterChange = (props) => {
    setActiveFilter(props);
  };

  let filteredTransactions = data;

  if (activeFilter.type) {
    filteredTransactions = filterTransactions({
      allTransactions: [...data],
      filterCriterium: activeFilter.type,
      filterPattern: activeFilter.pattern,
    });
  }

  const sortedEntries = groupTransactions(filteredTransactions);

  return (
    <TransactionsContext.Provider
      value={{
        data,
        isLoading,
        error,
        mutate,
        sortedEntries,
        activeFilter,
        handleFilterChange,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactionsContext() {
  return useContext(TransactionsContext);
}
