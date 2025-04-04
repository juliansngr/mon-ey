import dayjs from "dayjs";

export function groupTransactions(allTransactions) {
  const groupedByDate = Object.groupBy(allTransactions, (transaction) =>
    dayjs(transaction.date).format("YYYY.MM.DD")
  );
  const sortedEntries = Object.entries(groupedByDate).sort(
    ([dateA], [dateB]) => {
      return dayjs(dateB).valueOf() - dayjs(dateA).valueOf();
    }
  );

  return sortedEntries;
}

export function filterTransactions(
  allTransactions,
  filterCriterium,
  filterPattern
) {
  const filteredEntries = allTransactions.filter(
    (item) => item[filterCriterium] === filterPattern
  );
  return filteredEntries;
}
