import styled from "styled-components";
import { CircleArrowOutUpRight, CircleArrowOutDownRight } from "lucide-react";

export default function TransactionCard({ data }) {
  //Falls der Transaktions-Partner zu lang ist
  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <StyledTransactionCard $type={data.type}>
      <IconTextWrapper>
        {data.type === "income" ? (
          <StyledCircleArrowOutUpRight />
        ) : (
          <StyledCircleArrowOutDownRight />
        )}
        <div>
          <StyledTransactionPartner>
            {truncateText(data.partner, 20)}
          </StyledTransactionPartner>
          <p>{data.category}</p>
        </div>
      </IconTextWrapper>

      <StyledAmount $type={data.type}>
        {data.type === "income" ? "+" : "-"} {Math.abs(data.amount).toFixed(2)}{" "}
        €
      </StyledAmount>
    </StyledTransactionCard>
  );
}

const StyledTransactionCard = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 0 1px #e4e4e7, 0 10px 15px -3px rgba(0, 0, 0, 0.05),
    0 4px 6px -4px rgba(0, 0, 0, 0.05);

  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ebebeb;
  }
`;

const StyledAmount = styled.p`
  font-size: large;
  font-weight: 500;
  color: ${(props) => (props.$type === "income" ? "#05c47a" : "#fa3b3b")};
`;

const StyledCircleArrowOutUpRight = styled(CircleArrowOutUpRight)`
  color: #05c47a;
  width: 35px;
  height: 35px;
`;

const StyledCircleArrowOutDownRight = styled(CircleArrowOutDownRight)`
  color: #fa3b3b;
  width: 35px;
  height: 35px;
`;

const IconTextWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledTransactionPartner = styled.p`
  font-size: large;
  font-weight: 500;
`;
