import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import AdPlacement from "../AdPlacement";
import TransactionCard from "../TransactionCard";

export default function TransactionsList({ transactions }) {
  const adProps = {
    image: "/images/mm-man.png",
    title: "Save More with Our Offers!",
    text: "Discover exclusive deals to manage your finances better.",
    link: "https://app.mon-ey.com/",
  };

  let adInserted = false; // Track if the AdPlacement has been inserted
  let transactionCount = 0; // Track the overall transaction count

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
                  .map((transaction) => {
                    transactionCount++;

                    if (!adInserted && transactionCount === 3) {
                      adInserted = true;
                      return (
                        <AdPlacement {...adProps} key="ad-placement" />
                      );
                    }

                    return (
                      <TransactionCardLink
                        key={transaction.id}
                        href={`/transactions/${transaction._id}`}
                      >
                        <TransactionCard data={transaction} />
                      </TransactionCardLink>
                    );
                  })}
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
