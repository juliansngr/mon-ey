import { useTransactionsContext } from "@/contexts/TransactionsContext/TransactionsContext";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function BankAuthCallback() {
  const [status, setStatus] = useState("Import läuft...");
  const { data: session } = useSession();
  const { mutate } = useTransactionsContext();

  useEffect(() => {
    const run = async () => {
      try {
        const requisitionId =
          new URLSearchParams(window.location.search).get("requisition_id") ||
          localStorage.getItem("requisition_id");
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken || !requisitionId) {
          return setStatus("Zugriffsdaten fehlen.");
        }

        setStatus("Kontaktiere Bank...");

        const accountRes = await fetch("/api/banking/accounts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_token: accessToken,
            requisition_id: requisitionId,
          }),
        });

        if (!accountRes.ok) throw new Error("Fehler beim Abrufen der Konten");
        const { accountIds } = await accountRes.json();

        if (!accountIds?.length) return setStatus("Keine Konten gefunden.");

        setStatus("Lade Transaktionen...");

        const txRes = await fetch("/api/banking/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_token: accessToken,
            account_id: accountIds[0],
          }),
        });

        if (!txRes.ok && txRes.status !== 409)
          throw new Error("Fehler beim Abrufen der Transaktionen");
        const { transactions } = await txRes.json();

        if (!transactions?.length)
          return setStatus("Keine Transaktionen gefunden.");

        setStatus("Speichert Transaktionen...");

        const saveRes = await fetch("/api/banking/save-transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transactions,
            userId: session.user.id,
          }),
        });

        if (!saveRes.ok)
          throw new Error("Fehler beim Speichern der Transaktionen");
        const saveResult = await saveRes.json();

        if (saveResult.success) {
          mutate();
          setStatus(`✅ ${saveResult.count} Transaktionen gespeichert.`);
        } else {
          setStatus("❌ Fehler beim Speichern.");
        }
      } catch (error) {
        console.error(error);
        setStatus("❌ Fehler beim Importieren.");
      }
    };

    run();
  }, []);

  return (
    <CallbackWrapper>
      <CallbackHeading>
        Bitte habe einen Moment Geduld, während wir hier alles für dich
        vorbereiten:
      </CallbackHeading>
      <p>{status}</p>
    </CallbackWrapper>
  );
}

const CallbackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: var(--xl);
`;

const CallbackHeading = styled.h2`
  font-size: var(--xl);
`;
