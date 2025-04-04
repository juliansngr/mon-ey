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

export function filterTransactions({
  allTransactions,
  filterCriterium,
  filterOperator = "===",
  filterPattern,
}) {
  console.log(allTransactions);

  const filteredEntries = allTransactions.filter(
    (item) => item[filterCriterium] === filterPattern
  );
  return filteredEntries;
}

// eval(`${item[filterCriterium]} ${filterOperator} ${filterPattern}`)

// filterLib {date: ()=>{sortiert nach datum}, category: ()=>{}, }
// filter(data, identifier) {filterLib.category()}
