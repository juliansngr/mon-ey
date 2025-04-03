import dayjs from "dayjs";
import styled from "styled-components";
import TransactionCard from "../TransactionCard";
import Link from "next/link";

export default function TransactionsList({ transactions }) {
  return (
    <>
      <StyledH2>Transaktionen</StyledH2>
      <StyledUl>
        {transactions.map(([isoDate, dayTransactions]) => {
          const formattedDate = dayjs(isoDate).format("DD.MM.YYYY");

          return (
            <StyledLi key={isoDate}>
              <h3>{formattedDate}</h3>
              <StyledUl>
                {dayTransactions.map((transaction) => (
                  <TransactionCardLink
                    key={transaction.id}
                    href={`/transactions/${transaction.id}`}
                  >
                    <TransactionCard data={transaction} />
                  </TransactionCardLink>
                ))}
              </StyledUl>
            </StyledLi>
          );
        })}
      </StyledUl>
    </>
  );
}

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: var(--xs);
`;

const StyledH2 = styled.h2`
  font-size: var(--lg);
  margin-bottom: 1rem;
`;

const StyledLi = styled.li`
  display: flex;
  flex-direction: column;
  gap: var(--3xs);
`;

const TransactionCardLink = styled(Link)`
  cursor: pointer;
`;
