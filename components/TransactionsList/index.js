import dayjs from "dayjs";
import styled from "styled-components";
import TransactionCard from "../TransactionCard";

import Link from "next/link";

export default function TransactionsList({ transactions }) {
  return (
    <>
      <StyledUl>
        {transactions.length === 0 && (
          <NoTransactionText>Keine Transaktionen vorhanden.</NoTransactionText>
        )}
        {transactions.map(([isoDate, dayTransactions]) => {
          const formattedDate = dayjs(isoDate).format("DD.MM.YYYY");

          return (
            <StyledLi key={isoDate}>
              <h3>{formattedDate}</h3>
              <StyledUl>
                {dayTransactions
                  .sort(
                    (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
                  )
                  .map((transaction) => (
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

const StyledLi = styled.li`
  display: flex;
  flex-direction: column;
  gap: var(--3xs);
`;

const TransactionCardLink = styled(Link)`
  all: unset;
  cursor: pointer;
`;

const NoTransactionText = styled.p`
  text-align: center;
`;
