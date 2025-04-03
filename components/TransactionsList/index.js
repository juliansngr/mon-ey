import dayjs from "dayjs";
import styled from "styled-components";
import TransactionCard from "../TransactionCard";
import { CirclePlus } from "lucide-react";
import { useModalContext } from "@/utils/ModalContext/ModalContext";

export default function TransactionsList({ transactions }) {
  const { handleModalCall } = useModalContext();
  return (
    <>
      <StyledHeaderWrapper>
        <StyledH2>Transaktionen</StyledH2>
        <StyledAddButton onClick={handleModalCall}>
          <IconTextWrapper>
            <StyledCirclePlus></StyledCirclePlus>
          </IconTextWrapper>
        </StyledAddButton>
      </StyledHeaderWrapper>
      <StyledUl>
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
`;

const IconTextWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledCirclePlus = styled(CirclePlus)`
  color: var(--green-500);
  width: 35px;
  height: 35px;
`;

const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
