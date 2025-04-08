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
  const filteredEntries = allTransactions.filter((item) => {
    let filterString;
    switch (filterCriterium) {
      case "date":
        filterString = `item.date.startsWith("${filterPattern}")`;
        break;
      default:
        filterString = `"${item[filterCriterium]}" ${filterOperator} "${filterPattern}"`;
        break;
    }
    const result = eval(filterString);
    return result;
  });
  return filteredEntries;
}
