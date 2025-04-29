import {
  filterTransactions,
  groupTransactions,
} from "@/utils/FilterFunctionsLib/filterFunctions";
import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const fetcher = (url) => fetch(url).then((r) => r.json());

const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const { data: session, status } = useSession();
  const { pathname } = useRouter();
  const { data, isLoading, error, mutate } = useSWR(
    status === "authenticated" ? "/api/transactions" : null,
    fetcher
  );
  const [activeFilter, setActiveFilter] = useState({
    type: null,
    pattern: null,
  });

  const handleFilterChange = (props) => {
    setActiveFilter(props);
  };

  useEffect(() => {
    handleFilterChange({ type: null, pattern: null });
  }, [pathname]);

  if (isLoading) {
    return <p>Lädt...</p>;
  }

  if (status !== "authenticated" || !data) {
    return (
      <TransactionsContext.Provider
        value={{
          data: null,
          sortedEntries: null,
          isLoading: false,
          error: null,
          mutate: () => {},
          activeFilter: null,
          handleFilterChange: () => {},
        }}
      >
        {children}
      </TransactionsContext.Provider>
    );
  }

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
