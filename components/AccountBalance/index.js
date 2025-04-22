import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Chartbar from "../Chartbar";

let totalBalance = 0, totalIncome = 0, totalExpenses = 0;

export default function AccountBalance({ transactions }) {
  const [isNegative, setIsNegative] = useState(false);
  const [activeButton, setActiveButton] = useState(0);
  const { handleFilterChange } = useTransactionsContext();

  totalBalance = 0;
  totalIncome = 0;
  totalExpenses = 0;

  for (const transaction of transactions) {
    totalBalance += transaction.amount;

    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else if (transaction.type === "expense") {
      totalExpenses += transaction.amount;
    }
  }

  useEffect(() => {
    if (totalBalance < 0) {
      setIsNegative(true);
    }
  }, []);

  const handleToggle = (btnIndex) => {
    if (btnIndex === 0) {
      handleFilterChange({ type: null, pattern: null });
    } else if (btnIndex === 1) {
      handleFilterChange({ type: "type", pattern: "income" });
    } else if (btnIndex === 2) {
      handleFilterChange({ type: "type", pattern: "expense" });
    }
    setActiveButton(btnIndex);
  };

  return (
    <>
      <StyledSectionTwoColumn>

        <StyledSectionIncomeExpense>
          <StyledAccount
            className={activeButton === 0 ? "active" : ""}
            onClick={() => handleToggle(0)}
            aria-label="Gesamten Kontostand ein- oder ausblenden"
            aria-expanded={activeButton === 0 ? "true" : "false"}
            title="Gesamt Kontostand anzeigen"
          >
            <StyledTotalAmount $isNegative={isNegative}>
              <StyledTotalSpan>Aktueller Kontostand</StyledTotalSpan>
              {totalBalance.toFixed(2)} €
            </StyledTotalAmount>
          </StyledAccount>

          <StyledAccount
            className={activeButton === 1 ? "active" : ""}
            onClick={() => handleToggle(1)}
            aria-label="Gesamte Eingänge ein- oder ausblenden"
            aria-expanded={activeButton === 1 ? "true" : "false"}
            title="Gesamt Eingänge anzeigen"
          >
            <StyledTotalAmount>
              <StyledTotalSpan>Gesamt Eingang</StyledTotalSpan>
              {totalIncome.toFixed(2)} €
            </StyledTotalAmount>
          </StyledAccount>

          <StyledAccount
            className={activeButton === 2 ? "active" : ""}
            onClick={() => handleToggle(2)}
            aria-label="Gesamte Ausgänge ein- oder ausblenden"
            aria-expanded={activeButton === 1 ? "true" : "false"}
            title="Gesamt Ausgänge anzeigen"
          >
            <StyledTotalAmount $isNegative={true}>
              <StyledTotalSpan>Gesamt Ausgang</StyledTotalSpan>
              {totalExpenses.toFixed(2)} €
            </StyledTotalAmount>
          </StyledAccount>
        </StyledSectionIncomeExpense>

        <Chartbar totalIncome={totalIncome} totalExpenses={totalExpenses} />
      </StyledSectionTwoColumn>
    </>
  );
}

const StyledSectionTwoColumn = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--xs);
`;

const StyledSectionIncomeExpense = styled.section`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const StyledAccount = styled.button`
  display: flex;
  min-width: 10rem;
  margin: 0 0 var(--md);
  padding: var(--3xs);
  border-radius: var(--xs);
  background-color: var(--green-50);
  border: var(--3xs) solid transparent;
  box-shadow: var(--box-shadow-default);
  transition: background-color 0.6s ease, transform 0.8s ease;

  &:hover {
    transform: scale(1.1);
    background-color: var(--green-200);
    cursor: pointer;
    box-shadow: var(--box-shadow-active);
  }

  &.active {
    background-color: var(--green-500);
    border: var(--3xs) solid var(--darkgray);
    box-shadow: var(--box-shadow-active);
  }

  &:last-child.active {
    background-color: var(--red-500);
  }
  
  &.active p {
    color: var(--green-50);
  }

  &:last-child p {
    color: var(--red-500);
  }

  &.active:last-child p {
    color: var(--green-50);
  }
`;

const StyledTotalAmount = styled.p`
  width: 100%;
  font-size: var(--lg);
  font-weight: 500;
  text-align: right;
  color: ${(props) =>
    props.$isNegative ? `var(--red-500)` : `var(--green-500)`};
`;

const StyledTotalSpan = styled.span`
  display: block;
  font-size: var(--2xs);
  font-weight: 500;
  letter-spacing: var(--4xs);
  text-align: left;
  margin-bottom: var(--2xs);
  color: var(--green-text-dark);
`;


