import { useTransactionsContext } from "@/contexts/TransactionsContext/TransactionsContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function BankAuthCallback() {
  const [status, setStatus] = useState({
    message: "Import läuft...",
    processEnded: false,
  });
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
          return setStatus({
            message: "Zugriffsdaten fehlen.",
            processEnded: false,
          });
        }

        setStatus({
          message: "Kontaktiere Bank...",
          processEnded: false,
        });

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

        if (!accountIds?.length)
          return setStatus({
            message: "Kein Konto gefunden.",
            processEnded: false,
          });

        setStatus({
          message: "Lade Transaktionen...",
          processEnded: false,
        });

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
          return setStatus({
            message: "Keine Transaktionen gefunden.",
            processEnded: false,
          });

        setStatus({
          message: "Speichert Transaktionen...",
          processEnded: false,
        });

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
          setStatus({
            message: `✅ ${saveResult.count} Transaktionen gespeichert.`,
            processEnded: true,
          });
        } else {
          setStatus({
            message: "❌ Fehler beim Speichern.",
            processEnded: true,
          });
        }
      } catch (error) {
        console.error(error);
        setStatus({
          message: "❌ Fehler beim Importieren.",
          processEnded: true,
        });
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
      <p>{status.message}</p>
      {status.processEnded && (
        <Link href="/dashboard">
          <CallbackButton>Zurück zur Übersicht</CallbackButton>
        </Link>
      )}
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

const CallbackButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: var(--green-500);
  padding: var(--md) var(--xl);
  border-radius: var(--xs);
  color: var(--green-50);
`;
