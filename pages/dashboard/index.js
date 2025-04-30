import AccountBalance from "@/components/AccountBalance";
import TransactionsHeader from "@/components/TransactionsHeader";
import TransactionsList from "@/components/TransactionsList/";
import { useTransactionsContext } from "@/contexts/TransactionsContext/TransactionsContext";
import { getAdServerSideProps } from "@/utils/AdServerSideProps/adServerSideProps";

export default function HomePage({ ad }) {
  const { isLoading, sortedEntries, data } = useTransactionsContext();

  if (isLoading) return null;

  return (
    <>
      <AccountBalance transactions={data} />
      <TransactionsHeader hasAddButton />
      <TransactionsList transactions={sortedEntries} ad={ad} />
    </>
  );
}


export { getAdServerSideProps as getServerSideProps };

