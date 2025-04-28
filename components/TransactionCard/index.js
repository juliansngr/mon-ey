import { CircleArrowOutDownRight, CircleArrowOutUpRight } from "lucide-react";
import styled from "styled-components";

export default function TransactionCard({ data }) {
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
  padding: var(--md);
  border-radius: var(--xs);
  background-color: var(--lightgray);
  box-shadow: var(--box-shadow-default);

  transition: background-color 0.3s ease;
`;

const StyledAmount = styled.p`
  font-size: var(--lg);
  font-weight: 500;
  min-width: 7.25rem;
  padding-left: var(--3xs);
  text-align: right;
  color: ${(props) =>
    props.$type === "income" ? `var(--green-500)` : `var(--red-500)`};
`;

const StyledCircleArrowOutUpRight = styled(CircleArrowOutUpRight)`
  color: var(--green-500);
  width: 35px;
  height: 35px;
`;

const StyledCircleArrowOutDownRight = styled(CircleArrowOutDownRight)`
  color: var(--red-500);
  width: var(--4xl);
  height: var(--4xl);
`;

const IconTextWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledTransactionPartner = styled.p`
  font-size: var(--lg);
  font-weight: 500;
`;
