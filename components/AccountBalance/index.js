import styled from "styled-components";

export default function AccountBalance({ transactions }) {
  let totalBalance = 0;
  for (const transaction of transactions) {
    totalBalance += transaction.amount;
  }
  const isNegative = totalBalance < 0;

  return (
    <StyledAccount >
      <StyledTotalAmount $isNegative={isNegative}>
        Kontostand: {totalBalance.toFixed(2)} €
      </StyledTotalAmount>
    </StyledAccount>
  );
}

const StyledAccount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: var(--md) 0;
  padding: var(--md);
  border-radius: var(--xs);
  background-color: white;
  box-shadow: 0 0 0 1px #d2d2d5, 0 10px 15px -3px rgba(0, 0, 0, 0.05),
    0 4px 6px -4px rgba(0, 0, 0, 0.05);

  transition: background-color 0.3s ease;
`;

const StyledTotalAmount = styled.p`
width: 100%;
  font-size: var(--lg);
  font-weight: 500;
  color: ${(props) => (props.isNegative ? `var(--red-500)` : `var(--green-500)`)};
`;

