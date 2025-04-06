import dayjs from "dayjs";
import styled from "styled-components";
import TransactionCard from "../TransactionCard";
import { CirclePlus } from "lucide-react";
import { useModalContext } from "@/utils/ModalContext/ModalContext";
import Link from "next/link";

export default function TransactionsList({ transactions }) {
  const { openModal } = useModalContext();
  return (
    <>
      <StyledHeaderWrapper>
        <StyledH2>Transaktionen</StyledH2>
        <StyledAddButton
          onClick={() => {
            openModal("addTransaction");
          }}
          aria-label="add a transaction"
        >
          <StyledCirclePlus />
        </StyledAddButton>
      </StyledHeaderWrapper>
      <StyledUl>
        {transactions.length === 0 && (
          <NoTransactionWrapper>
            <NoTransactionText>
              Keine Transaktionen vorhanden.
            </NoTransactionText>
          </NoTransactionWrapper>
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

const StyledH2 = styled.h2`
  font-size: var(--2xl);
  margin-bottom: 1rem;
`;

const StyledLi = styled.li`
  display: flex;
  flex-direction: column;
  gap: var(--3xs);
`;

const StyledAddButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--green-500);
  width: 2.25rem;
  height: 2.25rem;
  cursor: pointer;
`;

const StyledCirclePlus = styled(CirclePlus)`
  width: 100%;
  height: 100%;
`;

const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TransactionCardLink = styled(Link)`
  all: unset;
  cursor: pointer;
`;

const NoTransactionWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const NoTransactionText = styled.p``;
