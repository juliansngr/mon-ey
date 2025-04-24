import Head from "next/head";
import BankConnect from "@/components/BankConnect"; // an Pfad anpassen

export default function Home() {
  return (
    <>
      <Head>
        <title>Bankanbindung</title>
      </Head>
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <BankConnect />
      </main>
    </>
  );
}
