import TransactionsList from "@/components/TransactionsList/";
import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";
import styled from "styled-components";
import { CalendarDays, Tag } from "lucide-react";
import {
  groupTransactions,
  filterTransactions,
} from "@/utils/FilterFunctionsLib/filterFunctions";

export default function AnalyticsPage() {
  const { isLoading, sortedEntries, data } = useTransactionsContext();

  function testFilterByCategory() {
    const filteredTransactions = filterTransactions({
      allTransactions: data,
      filterCriterium: "category",
      filterPattern: "Bildung",
    });
    console.log(filterTransactions);
  }

  if (isLoading) return null;

  return (
    <>
      <StyledH1>Analyse</StyledH1>
      <StyledH2>Filtern nach:</StyledH2>
      <StyledFilterCriteriaWrapper>
        <StyledFilterButton onClick={() => testFilterByCategory()}>
          <IconTextWrapper>
            <StyledTag></StyledTag>
          </IconTextWrapper>
        </StyledFilterButton>
        <StyledFilterButton>
          <IconTextWrapper>
            <StyledCalendarDays></StyledCalendarDays>
          </IconTextWrapper>
        </StyledFilterButton>
      </StyledFilterCriteriaWrapper>

      <TransactionsList transactions={sortedEntries} />
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
