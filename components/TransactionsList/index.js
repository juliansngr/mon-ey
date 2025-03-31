export default function TransactionsList({ transactions }) {
  return (
    <ul>
      {transactions.map((transaction) => {
        return (
          <li key={transaction.id}>
            <p>Transaction ID: {transaction.id}</p>
            <p>{transaction.amount}</p>
          </li>
        );
      })}
    </ul>
  );
}
