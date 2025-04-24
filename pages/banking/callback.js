import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function BankAuthCallback() {
  const [status, setStatus] = useState("Import läuft...");
  const { data: session } = useSession();
  console.log(session);
  useEffect(() => {
    const run = async () => {
      try {
        const url = new URL(window.location.href);
        const requisitionId =
          new URLSearchParams(window.location.search).get("requisition_id") ||
          localStorage.getItem("requisition_id");
        const accessToken = localStorage.getItem("access_token"); // aus BankConnect.js vorher setzen

        if (!accessToken || !requisitionId) {
          return setStatus("Zugriffsdaten fehlen.");
        }

        // 1. Konten laden
        const accountRes = await fetch("/api/banking/accounts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_token: accessToken,
            requisition_id: requisitionId,
          }),
        });

        const { accountIds } = await accountRes.json();
        if (!accountIds?.length) return setStatus("Keine Konten gefunden.");

        // 2. Transaktionen holen (erste Konto-ID verwenden)
        const txRes = await fetch("/api/banking/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_token: accessToken,
            account_id: accountIds[0],
          }),
        });

        const { transactions } = await txRes.json();
        console.log(transactions);
        if (!transactions?.length)
          return setStatus("Keine Transaktionen gefunden.");

        // 3. Transaktionen speichern
        const saveRes = await fetch("/api/banking/save-transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transactions,
            userId: session.user.id, // <-- echte MongoDB-User-ID!
          }),
        });

        const saveResult = await saveRes.json();

        if (saveResult.success) {
          setStatus(`✅ ${saveResult.count} Transaktionen gespeichert.`);
        } else {
          setStatus("❌ Fehler beim Speichern.");
        }
      } catch (err) {
        console.error(err);
        setStatus("❌ Fehler beim Importieren.");
      }
    };

    run();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-bold mb-2">Bank-Datenimport</h1>
      <p>{status}</p>
    </div>
  );
}
