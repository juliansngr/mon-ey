import LoginButton from "@/components/LoginButton";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";

export default function HomePage() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <ContentWrapper>
      <StyledHeading>
        Die <ColorChange>Finanz-App</ColorChange> der nächsten Generation
      </StyledHeading>
      {session ? (
        <Link href="/dashboard">
          <DashboardButton>Zum Dashboard</DashboardButton>
        </Link>
      ) : (
        <>
          <LoginButton />
          <StyledTextEntry>
            Diese App erfordert einen <strong>GitHub-Login, um deine Daten sicher zu speichern</strong> und dir ein personalisiertes Erlebnis zu bieten.
          </StyledTextEntry>
          <StyledTextEntry>
            Mit mon-ey kannst du deine Finanzen einfach im Blick behalten. Erfasse Einnahmen und Ausgaben, visualisiere deine finanzielle Situation mithilfe übersichtlicher Grafiken und analysiere deine Spartipps – alles in einer intuitiven Benutzeroberfläche.
          </StyledTextEntry>
        </>
      )}
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--3xl);
  align-items: center;
`;

const StyledHeading = styled.h2`
  font-size: var(--5xl);
  font-weight: bold;
  text-align: center;
`;

const ColorChange = styled.span`
  color: var(--green-600);
`;

const DashboardButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: var(--green-500);
  padding: var(--md) var(--xl);
  border-radius: var(--xs);
  color: var(--green-50);
  box-shadow: var(--box-shadow-default);
  transition: background-color 0.6s ease, transform 0.8s ease;

  &:hover {
    transform: scale(1.1);
    background-color: var(--green-600);
    cursor: pointer;
    box-shadow: var(--box-shadow-active);
  }
`;

const StyledTextEntry = styled.p`
  color: var(--green-600);
`;
