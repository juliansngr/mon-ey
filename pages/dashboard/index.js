import AccountBalance from "@/components/AccountBalance";
import TransactionsHeader from "@/components/TransactionsHeader";
import TransactionsList from "@/components/TransactionsList/";
import { useTransactionsContext } from "@/contexts/TransactionsContext/TransactionsContext";
import dbConnect from "@/db/dbConnect";
import AdPlacementModel from "@/db/models/AdPlacement";


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

export async function getServerSideProps() {
  await dbConnect();

  let ads = await AdPlacementModel.find();
  let selectedAd = null;

  // Add an Ad if there are any available
  if (ads.length > 0) {
    const randomIndex = Math.floor(Math.random() * ads.length);
    selectedAd = {
      title: ads[randomIndex].title,
      imageUrl: ads[randomIndex].imageUrl,
      link: ads[randomIndex].link,
      text: ads[randomIndex].text,
    };
  }

  return {
    props: {
      ad: selectedAd, // null or one ad object
    },
  };
}
