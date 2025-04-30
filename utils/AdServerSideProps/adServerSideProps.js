import dbConnect from "@/db/dbConnect";
import AdPlacementModel from "@/db/models/AdPlacement";

export async function getAdServerSideProps() {
    await dbConnect();

    let ads = await AdPlacementModel.find();
    let selectedAd = null;

    // 50% chance to select an ad
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
            ad: selectedAd, // null or one ad object
        },
    };
}