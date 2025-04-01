import styled from "styled-components";
import TransactionCard from "../TransactionCard";
import dayjs from "dayjs";

export default function TransactionsList({ transactions }) {
  return (
    <>
      <StyledH2>Transaktionen</StyledH2>
      <StyledUl>
        {transactions.map(([isoDate, dayTransactions]) => {
          //Datum umformatieren

          const formattedDate = dayjs(isoDate).format("DD.MM.YYYY");

          return (
            <StyledLi key={isoDate}>
              <h3>{formattedDate}</h3>
              <StyledUl>
                {dayTransactions.map((transaction) => (
                  <TransactionCard key={transaction.id} data={transaction} />
                  // <li key={transaction.id}>
                  //   <p>Transaction ID: {transaction.id}</p>
                  //   <p>Amount: {transaction.amount}</p>
                  // </li>
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
  gap: 10px;
`;

const StyledH2 = styled.h2`
  font-size: x-large;
  margin-bottom: 1rem;
`;

const StyledLi = styled.li`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
