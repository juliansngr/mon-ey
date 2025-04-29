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

  // 50% chance that an ad is selected
  if (Math.random() < 0.5 && ads.length > 0) {
    const randomIndex = Math.floor(Math.random() * ads.length);
    const ad = ads[randomIndex];
    selectedAd = {
      title: ad.title,
      imageUrl: ad.imageUrl,
      link: ad.link,
      text: ad.text,
    };
  }

  // Fallback: Falls kein Ad ausgewählt wurde, wähle ein zufälliges Ad aus der Liste
  if (!selectedAd && ads.length > 0) {
    const fallbackIndex = Math.floor(Math.random() * ads.length);
    const fallbackAd = ads[fallbackIndex];
    selectedAd = {
      title: fallbackAd.title,
      imageUrl: fallbackAd.imageUrl,
      link: fallbackAd.link,
      text: fallbackAd.text,
    };
  }

  return {
    props: {
      ad: selectedAd, // null oder ein Ad
    },
  };
}
