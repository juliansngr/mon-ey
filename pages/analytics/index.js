import TransactionsHeader from "@/components/TransactionsHeader";
import TransactionsList from "@/components/TransactionsList/";
import { useModalContext } from "@/contexts/ModalContext/ModalContext";
import { useTransactionsContext } from "@/contexts/TransactionsContext/TransactionsContext";
import { CalendarDays, Tag } from "lucide-react";
import { useEffect } from "react";
import styled from "styled-components";

export default function AnalyticsPage() {
  const { sortedEntries, activeFilter, handleFilterChange } =
    useTransactionsContext();
  const { openModal } = useModalContext();

  useEffect(() => {
    handleFilterChange({ type: null, pattern: null });
  }, []);

  function handleClickFilter(filterType) {
    if (activeFilter.type !== filterType || !activeFilter.type) {
      let applyModalFilterTitle;

      switch (filterType) {
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

      openModal("filter", {
        title: applyModalFilterTitle,
        filterType: filterType,
      });
    } else {
      handleFilterChange({ type: null, pattern: null });
    }
  }

  return (
    <>
      <StyledH1>Analyse</StyledH1>
      <StyledH2>Filtern nach:</StyledH2>
      <StyledFilterCriteriaWrapper>
        <StyledFilterButton onClick={() => handleClickFilter("category")}>
          <IconTextWrapper>
            <StyledTag
              $activated={activeFilter.type === "category" ? true : false}
            ></StyledTag>
          </IconTextWrapper>
        </StyledFilterButton>
        <StyledFilterButton onClick={() => handleClickFilter("date")}>
          <IconTextWrapper>
            <StyledCalendarDays
              $activated={activeFilter.type === "date" ? true : false}
            ></StyledCalendarDays>
          </IconTextWrapper>
        </StyledFilterButton>
      </StyledFilterCriteriaWrapper>
      <TransactionsHeader />
      {sortedEntries.length > 0 ? (
        <TransactionsList transactions={sortedEntries} />
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
