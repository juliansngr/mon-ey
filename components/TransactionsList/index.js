import dayjs from "dayjs";
import Link from "next/link";
import styled from "styled-components";
import AdPlacement from "../AdPlacement";
import TransactionCard from "../TransactionCard";


export default function TransactionsList({ transactions, ad }) {
  let transactionCount = 0;
  let adInserted = false;

  return (
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
                .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())
                .reduce((acc, transaction, index) => {
                  transactionCount++;

                  // Add AdPlacement after every 3 transactions if it hasn't been inserted yet
                  if (!adInserted && ad && transactionCount === 3) {
                    acc.push(
                      <AdPlacement
                        key={`ad-${transaction._id}`}
                        image={ad.imageUrl}
                        title={ad.title}
                        text={ad.text}
                        link={ad.link}
                      />
                    );
                    adInserted = true;
                  }

                  // Add the next transaction card to the list
                  acc.push(
                    <TransactionCardLink
                      key={transaction._id}
                      href={`/transactions/${transaction._id}`}
                    >
                      <TransactionCard data={transaction} />
                    </TransactionCardLink>
                  );

                  return acc;
                }, [])}
            </StyledUl>
          </StyledLi>
        );
      })}
    </StyledUl>
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
