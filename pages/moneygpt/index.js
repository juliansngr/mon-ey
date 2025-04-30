import { useTransactionsContext } from "@/contexts/TransactionsContext/TransactionsContext";
import { Angry, BicepsFlexed, RotateCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

export default function Chat() {
  const { data: transactions } = useTransactionsContext();
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendTransactions = async () => {
    if (!transactions || transactions.length === 0) {
      setResponse("Keine Transaktionen gefunden.");

      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/financial-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactions),
      });

      if (res.status === 504) {
        throw new Error(`Server ist ausgelastet - versuche es später nochmal.`);
      }
      if (res.status === 429) {
        throw new Error(
          "Zu viele Anfragen – warte kurz und versuch es nochmal."
        );
      }

      if (!res.headers.get("content-type").includes("application/json")) {
        throw new Error(`Die Antwort ist kein application/json.`);
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
          <RedButton
            aria-label="Ich traue mich! Zeig was MoneyGPT analysiert hat"
            onClick={() => sendTransactions()}
          >
            <BicepsFlexed aria-hidden="true" />
            Ich traue mich!
          </RedButton>
          <Link href="https://de.wiktionary.org/wiki/Versager">
            <RedButton aria-label="Ich traue mich nicht! Zeig mir die Bedeutung von Versager">
              <Angry aria-hidden="true" />
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

            <RedButton
              aria-label="Nochmal analysieren"
              onClick={() => sendTransactions()}
            >
              <RotateCw aria-hidden="true" />
              Nochmal analysieren
            </RedButton>
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
  gap: var(--md);
  padding-top: var(--4xl);
  position: relative;
  & svg {
    margin-right: var(--md);
  }
`;

const DefaultText = styled.p`
  text-align: center;
  line-height: var(--3xl);
  font-size: var(--xl);
  margin-bottom: var(--xl);
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
  & > button {
    box-shadow: var(--box-shadow-default);
    transition: background-color 0.6s ease, transform 0.8s ease;

    &:hover {
      transform: scale(1.1);
      background-color: var(--green-600);
      cursor: pointer;
      box-shadow: var(--box-shadow-active);
    }
  }
`;

const RedButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--xs) var(--xl);
  line-height: 1.15;
  font-size: 100%;
  color: var(--green-50);
  border: none;
  border-radius: var(--xs);
  background-color: var(--red-500);
  box-shadow: var(--box-shadow-default);
  transition: background-color 0.6s ease, transform 0.8s ease;

  &:hover {
    transform: scale(1.1);
    background-color: var(--green-600);
    cursor: pointer;
    box-shadow: var(--box-shadow-active);
  }
`;
