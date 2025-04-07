import TransactionsList from "@/components/TransactionsList/";
import TransactionFilters from "@/components/TransactionFilters";
import Modal from "@/components/Modal";
import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";
import { useModalContext } from "@/utils/ModalContext/ModalContext";
import {
  groupTransactions,
  filterTransactions,
} from "@/utils/FilterFunctionsLib/filterFunctions";

import styled from "styled-components";
import { CalendarDays, Tag } from "lucide-react";
import { useState } from "react";

export default function AnalyticsPage() {
  const { isLoading, sortedEntries, data } = useTransactionsContext();
  const { modalOpen, handleModalCall } = useModalContext();
  const [displayedEntries, setDisplayedEntries] = useState([...sortedEntries]);
  const [useFilterType, setUseFilterType] = useState();

  function getTransactionsFiltered({
    allTransactions,
    filterCriterium,
    filterPattern,
  }) {
    const filteredTransactions = filterTransactions({
      allTransactions: [...allTransactions],
      filterCriterium: filterCriterium,
      filterPattern: filterPattern,
    });

    setDisplayedEntries([...groupTransactions(filteredTransactions)]);
  }

  function handleClickFilter(filterType) {
    if (useFilterType !== filterType) {
      setUseFilterType(filterType);
      handleModalCall();
    } else {
      setUseFilterType();
      setDisplayedEntries([...groupTransactions(data)]);
    }
  }

  let useModalFilterTitle;

  switch (useFilterType) {
    case "date":
      useModalFilterTitle = "Nach Datum filtern";
      break;
    case "category":
      useModalFilterTitle = "Nach Kategorie filtern";
      break;
    default:
      useModalFilterTitle = "";
      break;
  }

  if (isLoading) return null;

  return (
    <>
      {modalOpen && (
        <Modal title={useModalFilterTitle}>
          <TransactionFilters
            getTransactionsFiltered={getTransactionsFiltered}
            filterType={useFilterType}
          />
        </Modal>
      )}
      <StyledH1>Analyse</StyledH1>
      <StyledH2>Filtern nach:</StyledH2>
      <StyledFilterCriteriaWrapper>
        <StyledFilterButton onClick={() => handleClickFilter("category")}>
          <IconTextWrapper>
            <StyledTag
              activated={useFilterType === "category" ? true : false}
            ></StyledTag>
          </IconTextWrapper>
        </StyledFilterButton>
        <StyledFilterButton onClick={() => handleClickFilter("date")}>
          <IconTextWrapper>
            <StyledCalendarDays
              activated={useFilterType === "date" ? true : false}
            ></StyledCalendarDays>
          </IconTextWrapper>
        </StyledFilterButton>
      </StyledFilterCriteriaWrapper>

      {displayedEntries.length > 0 ? (
        <TransactionsList transactions={displayedEntries} />
      ) : (
        <StyledH2>Keine Daten für den gew&auml;hlten Filter!</StyledH2>
      )}
    </>
  );
}

const StyledH1 = styled.h1`
  font-size: var(--3xl);
  margin-bottom: 1rem;
`;

const StyledH2 = styled.h2`
  font-size: var(--2xl);
  margin-bottom: 1rem;
`;

const StyledFilterButton = styled.button`
  background-color: transparent;
  border: none;
`;

const IconTextWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledCalendarDays = styled(CalendarDays)`
  color: ${(props) =>
    props.activated ? `var(--red-500)` : `var(--green-500)`};
  width: 35px;
  height: 35px;
  fill: ${(props) => (props.activated ? `var(--green-500)` : "none")};
`;

const StyledTag = styled(Tag)`
  color: ${(props) =>
    props.activated ? `var(--red-500)` : `var(--green-500)`};
  width: 35px;
  height: 35px;
  fill: ${(props) => (props.activated ? `var(--green-500)` : "none")};
`;
const StyledFilterCriteriaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--xl);
  padding: 1rem;
`;
