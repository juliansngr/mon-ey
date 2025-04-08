import TransactionsList from "@/components/TransactionsList/";
import TransactionFilters from "@/components/TransactionFilters";
import TransactionsHeader from "@/components/TransactionsHeader";
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
  const [appliedFilterType, setAppliedFilterType] = useState();
  const [activeFilterType, setActiveFilterType] = useState();

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
    setActiveFilterType(appliedFilterType);
    setDisplayedEntries([...groupTransactions(filteredTransactions)]);
  }

  function handleClickFilter(filterType) {
    if (appliedFilterType !== filterType) {
      setAppliedFilterType(filterType);
      handleModalCall();
    } else {
      setAppliedFilterType();
      setActiveFilterType();
      setDisplayedEntries([...groupTransactions(data)]);
    }
  }

  let applyModalFilterTitle;

  switch (appliedFilterType) {
    case "date":
      applyModalFilterTitle = "Nach Datum filtern";
      break;
    case "category":
      applyModalFilterTitle = "Nach Kategorie filtern";
      break;
    default:
      applyModalFilterTitle = "";
      break;
  }

  if (isLoading) return null;

  return (
    <>
      {modalOpen && (
        <Modal title={applyModalFilterTitle}>
          <TransactionFilters
            getTransactionsFiltered={getTransactionsFiltered}
            filterType={appliedFilterType}
          />
        </Modal>
      )}
      <StyledH1>Analyse</StyledH1>
      <StyledH2>Filtern nach:</StyledH2>
      <StyledFilterCriteriaWrapper>
        <StyledFilterButton onClick={() => handleClickFilter("category")}>
          <IconTextWrapper>
            <StyledTag
              $activated={activeFilterType === "category" ? true : false}
            ></StyledTag>
          </IconTextWrapper>
        </StyledFilterButton>
        <StyledFilterButton onClick={() => handleClickFilter("date")}>
          <IconTextWrapper>
            <StyledCalendarDays
              $activated={activeFilterType === "date" ? true : false}
            ></StyledCalendarDays>
          </IconTextWrapper>
        </StyledFilterButton>
      </StyledFilterCriteriaWrapper>
      <TransactionsHeader />
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
  cursor: pointer;
`;

const IconTextWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledCalendarDays = styled(CalendarDays)`
  color: ${(props) =>
    props.$activated ? `var(--red-500)` : `var(--green-500)`};
  width: 35px;
  height: 35px;
  fill: ${(props) => (props.$activated ? `var(--green-500)` : "none")};
`;

const StyledTag = styled(Tag)`
  color: ${(props) =>
    props.$activated ? `var(--red-500)` : `var(--green-500)`};
  width: 35px;
  height: 35px;
  fill: ${(props) => (props.$activated ? `var(--green-500)` : "none")};
`;
const StyledFilterCriteriaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--xl);
  padding: 1rem;
`;
