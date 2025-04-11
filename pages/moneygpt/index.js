import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { RotateCw } from "lucide-react";

export default function Chat() {
  const { data: transactions, isLoading } = useTransactionsContext();
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const sendTransactions = async () => {
      if (!transactions || transactions.length === 0) return;
      setError(false);
      setLoading(true);
      setResponse("");

      try {
        const res = await fetch("/api/financial-analysis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transactions),
        });

        if (res.status === 504) {
          throw new Error(
            `Server ist ausgelastet - versuche es später nochmal`
          );
        }
        if (res.status === 429) {
          throw new Error(
            "Zu viele Anfragen – warte kurz und versuch es nochmal"
          );
        }

        if (!res.headers.get("content-type").includes("application/json")) {
          throw new Error(`Response isn't type application/json`);
        }

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            "Ein Fehler ist aufgetreten. Bitte versuche es erneut."
          );
        }

        setResponse(data.response || "Keine Antwort erhalten.");
      } catch (error) {
        setResponse("Fehler: " + error.message);
        setError(true);
      }

      setLoading(false);
    };

    sendTransactions();
  }, [reloadTrigger]);

  return (
    <div className="">
      {loading && (
        <LoadingWrapper>
          <LoadingSpinner
            src="/images/load.gif"
            alt="rotating money gif"
            width={80}
            height={80}
          />
          Analysiert deine Transaktionen...
        </LoadingWrapper>
      )}

      {response && (
        <ResponseWrapper>
          <ReactMarkdown>{response}</ReactMarkdown>
          <ResponseText></ResponseText>

          {response === "Keine Antwort erhalten." && (
            <RetryButton onClick={() => setReloadTrigger((prev) => prev + 1)}>
              <RetryIcon />
              Nochmal versuchen
            </RetryButton>
          )}
          {error && (
            <RetryButton onClick={() => setReloadTrigger((prev) => prev + 1)}>
              <RetryIcon />
              Nochmal versuchen
            </RetryButton>
          )}
        </ResponseWrapper>
      )}
    </div>
  );
}

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--sm);
  width: 100vw;
  height: 100vh;
`;

const LoadingSpinner = styled(Image)`
  border-radius: 50%;
  margin-bottom: var(--xl);
`;

const ResponseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--md);

  padding: var(--md);
  border-radius: var(--xs);
  background-color: white;
  box-shadow: 0 0 0 1px #d2d2d5, 0 10px 15px -3px rgba(0, 0, 0, 0.05),
    0 4px 6px -4px rgba(0, 0, 0, 0.05);
`;

const ResponseText = styled.p``;

const RetryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--xs);
  padding: var(--xs) var(--xl);
  line-height: 1.15;
  font-size: 100%;
  color: var(--green-50);
  border: none;
  border-radius: var(--xs);
  background-color: var(--red-500);
  cursor: pointer;
`;

const RetryIcon = styled(RotateCw)``;
