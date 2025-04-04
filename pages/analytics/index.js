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
  const { isLoading, sortedEntries, data, mutate } = useTransactionsContext();
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
    console.log(filteredTransactions);
    setDisplayedEntries([...groupTransactions(filteredTransactions)]);
  }

  function handleOpenFilter(filterType) {
    setUseFilterType(filterType);
    handleModalCall();
  }

  if (isLoading) return null;

  return (
    <>
      {modalOpen && (
        <Modal title="">
          <TransactionFilters
            getTransactionsFiltered={getTransactionsFiltered}
            filterType={useFilterType}
          />
        </Modal>
      )}
      <StyledH1>Analyse</StyledH1>
      <StyledH2>Filtern nach:</StyledH2>
      <StyledFilterCriteriaWrapper>
        <StyledFilterButton onClick={() => handleOpenFilter("category")}>
          <IconTextWrapper>
            <StyledTag></StyledTag>
          </IconTextWrapper>
        </StyledFilterButton>
        <StyledFilterButton onClick={() => handleOpenFilter("date")}>
          <IconTextWrapper>
            <StyledCalendarDays></StyledCalendarDays>
          </IconTextWrapper>
        </StyledFilterButton>
      </StyledFilterCriteriaWrapper>

      <TransactionsList transactions={displayedEntries} />
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
  color: var(--green-500);
  width: 35px;
  height: 35px;
`;

const StyledTag = styled(Tag)`
  color: var(--green-500);
  width: 35px;
  height: 35px;
`;
const StyledFilterCriteriaWrapper = styled.div`
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  gap: var(--xl);
  padding: 1rem;
`;
