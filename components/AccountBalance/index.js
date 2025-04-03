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
    </>
  );
}

const StyledAccount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 8rem;
  margin: var(--md) 0;
  padding: var(--md);
  padding-top: var(--xs);
  border-radius: var(--xs);
  background-color: white;
  box-shadow: var(--box-shadow-default);
  transition: background-color 0.3s ease;
`;

const StyledTotalAmount = styled.p`
  width: 100%;
  font-size: var(--lg);
  font-weight: 500;
  text-align: center;
  color: ${(props) =>
    props.isNegative ? `var(--red-500)` : `var(--green-500)`};
`;

const StyledTotalSpan = styled.span`
  display: block;
  font-size: var(--2xs);
  font-weight: 500;
  text-align: left;
  color: var(--green-text-dark);
  margin-bottom: var(--3xs);
`;