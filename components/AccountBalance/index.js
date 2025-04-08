import { useEffect, useState } from "react";
import styled from "styled-components";

let totalBalance = 0, totalIncome = 0, totalExpenses = 0;

export default function AccountBalance({ transactions }) {
  const [isNegative, setIsNegative] = useState(false);
  const [activeButton, setActiveButton] = useState(0);

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
    setActiveButton(btnIndex);
  };

  return (
    <>
      <StyledAccount
        className={activeButton === 0 ? "active" : ""}
        onClick={() => handleToggle(0)}
        aria-label="Gesamt Kontostand anzeigen" title="Gesamt Kontostand anzeigen"
      >
        <StyledTotalAmount $isNegative={isNegative}>
          <StyledTotalSpan>Aktueller Kontostand</StyledTotalSpan>
          {totalBalance.toFixed(2)} €
        </StyledTotalAmount>
      </StyledAccount>

      <StyledSectionIncomeExpense>
        <StyledAccount
          className={activeButton === 1 ? "active" : ""}
          onClick={() => handleToggle(1)}
          aria-label="Gesamt Eingänge anzeigen" title="Gesamt Eingänge anzeigen"
        >
          <StyledTotalAmount>
            <StyledTotalSpan>Gesamt Eingang</StyledTotalSpan>
            {totalIncome.toFixed(2)} €
          </StyledTotalAmount>
        </StyledAccount>

        <StyledAccount
          className={activeButton === 2 ? "active" : ""}
          onClick={() => handleToggle(2)}
          aria-label="Gesamt Ausgänge anzeigen" title="Gesamt Ausgänge anzeigen"
        >
          <StyledTotalAmount $isNegative={true}>
            <StyledTotalSpan>Gesamt Ausgang</StyledTotalSpan>
            {totalExpenses.toFixed(2)} €
          </StyledTotalAmount>
        </StyledAccount>
      </StyledSectionIncomeExpense>
    </>
  );
}

const StyledAccount = styled.button`
  display: flex;
  min-width: 10rem;
  margin: 0 0 var(--md);
  padding: var(--3xs);
  border-radius: var(--xs);
  background-color: white;
  border: var(--3xs) solid transparent;
  box-shadow: var(--box-shadow-default);
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background-color: var(--green-200);
    cursor: pointer;
  }

  &.active {
    background-color: var(--green-500);
    border: var(--3xs) solid var(--darkgray);
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

const StyledSectionIncomeExpense = styled.section`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;
