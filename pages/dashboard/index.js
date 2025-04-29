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

  console.log("ads aus getServerSideProps: ", ads);

  // 50% Chance, einen Ad auszuwählen
  // if (Math.random() < 0.5 && ads.length > 0) {
  //   const randomIndex = Math.floor(Math.random() * ads.length);
  // Wähle immer ein Ad aus, wenn Anzeigen vorhanden sind
  if (ads.length > 0) {
    const randomIndex = Math.floor(Math.random() * ads.length);
    const ad = ads[randomIndex];
    selectedAd = {
      title: ad.title,
      imageUrl: ad.imageUrl,
      link: ad.link,
      text: ad.text,
    };
  }

  return {
    props: {
      ad: selectedAd, // null oder ein Ad
    },
  };
}
