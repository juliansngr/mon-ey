import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { RotateCw, BicepsFlexed, Angry } from "lucide-react";
import Link from "next/link";

export default function Chat() {
  const { data: transactions } = useTransactionsContext();
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [error, setError] = useState(false);

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
        throw new Error(`Server ist ausgelastet - versuche es später nochmal`);
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

  return (
    <>
      {!loading && !response && (
        <ContentWrapper>
          <DefaultText>
            Stell dir vor, dein Kontostand wäre ein Comedy-Programm – aber mit
            bitterem Ernst. mon-eyGPT analysiert deine Ausgaben und reißt dir
            gnadenlos den Geld-Irrsinn unter’m Hintern weg. Kein Bullshit, keine
            Wattebällchen. Brutal ehrlich, deshalb nix für schwache Nerven.
            Traust du dich?
          </DefaultText>
          <RedButton onClick={() => sendTransactions()}>
            <BicepsFlexed />
            Ich traue mich!
          </RedButton>
          <Link href="https://de.wiktionary.org/wiki/Versager">
            <RedButton>
              <Angry />
              Ich mich nicht...
            </RedButton>
          </Link>
        </ContentWrapper>
      )}

      {loading && (
        <ContentWrapper>
          <LoadingSpinner
            src="/images/load.gif"
            alt="rotating money gif"
            width={80}
            height={80}
          />
          Analysiert deine Transaktionen...
        </ContentWrapper>
      )}

      {response && (
        <ContentWrapper>
          <ResponseWrapper>
            <ReactMarkdown>{response}</ReactMarkdown>
            <ResponseText></ResponseText>

            {response === "Keine Antwort erhalten." && (
              <RedButton onClick={() => sendTransactions()}>
                <RetryIcon />
                Nochmal versuchen
              </RedButton>
            )}
            {error && (
              <RedButton onClick={() => sendTransactions()}>
                <RetryIcon />
                Nochmal versuchen
              </RedButton>
            )}
          </ResponseWrapper>
        </ContentWrapper>
      )}
    </>
  );
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--sm);

  min-height: 100vh;
  padding: var(--md) 0 var(--5xl) 0;
  position: relative;
`;

const DefaultText = styled.p`
  text-align: center;
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

const RedButton = styled.button`
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
