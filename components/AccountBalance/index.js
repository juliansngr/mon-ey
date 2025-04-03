import { useEffect, useState } from "react";
import styled from "styled-components";

let totalBalance = 0, totalIncome = 0, totalExpenses = 0;

export default function AccountBalance({ transactions }) {
  const [isNegative, setIsNegative] = useState(false);

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

  return (
    <>
      <StyledAccount>
        <StyledTotalAmount isNegative={isNegative}>
          <StyledTotalSpan>Aktueller Kontostand</StyledTotalSpan> {totalBalance.toFixed(2)} €
        </StyledTotalAmount>
      </StyledAccount>
      <StyledSectionIncomeExpense>
        <StyledAccount>
          <StyledTotalAmount>
            <StyledTotalSpan>Gesamt Eingang</StyledTotalSpan> {totalIncome.toFixed(2)} €
          </StyledTotalAmount>
        </StyledAccount>

        <StyledAccount>
          <StyledTotalAmount isNegative={true}>
            <StyledTotalSpan>Gesamt Ausgang</StyledTotalSpan> {totalExpenses.toFixed(2)} €
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

  &:active {
    background-color: var(--green-500);
    border: var(--3xs) solid var(--darkgray); /* Gleiche Breite wie oben */
  }

  &:active p {
    color: var(--green-50);
  }

  &:active:last-child p {
    color: var(--red-500);
  }
`;

const StyledTotalAmount = styled.p`
width: 100%;
font-size: var(--lg);
font-weight: 500;
text-align: right;
color: ${(props) =>
    props.isNegative ? `var(--red-500)` : `var(--green-500)`
  };
`;

const StyledTotalSpan = styled.span`
display: block;
font-size: var(--2xs);
font-weight: 500;
text-align: left;
margin-bottom: var(--2xs);
color: var(--green-text-dark);
`;

const StyledSectionIncomeExpense = styled.section`
display: flex;
justify-content: space-between;
flex-direction: row;
`;