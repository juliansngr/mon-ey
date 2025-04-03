import dayjs from "dayjs";
import styled from "styled-components";
import TransactionCard from "../TransactionCard";
import { CirclePlus } from "lucide-react";
import { useModalContext } from "@/utils/ModalContext/ModalContext";

export default function TransactionsList({ transactions }) {
  const { handleModalCall } = useModalContext();
  return (
    <>
      <StyledH2>Transaktionen</StyledH2>
      <StyledAddButton onClick={handleModalCall}>
        <IconTextWrapper>
          <StyledCirclePlus></StyledCirclePlus>
        </IconTextWrapper>
      </StyledAddButton>
      <StyledUl>
        {transactions.map(([isoDate, dayTransactions]) => {
          const formattedDate = dayjs(isoDate).format("DD.MM.YYYY");

          return (
            <StyledLi key={isoDate}>
              <h3>{formattedDate}</h3>
              <StyledUl>
                {dayTransactions.map((transaction) => (
                  <TransactionCard key={transaction.id} data={transaction} />
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

const StyledAddButton = styled.button``;

const IconTextWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledCirclePlus = styled(CirclePlus)`
  color: var(--green-500);
  width: 35px;
  height: 35px;
`;
