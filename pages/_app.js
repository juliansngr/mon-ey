import BackToTop from "@/components/BackToTop";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/contexts/AuthContext/AuthContext";
import { ModalProvider } from "@/contexts/ModalContext/ModalContext";
import { RulebaseProvider } from "@/contexts/RulebaseContext/RulebaseContext";
import { TransactionsProvider } from "@/contexts/TransactionsContext/TransactionsContext";
import { SessionProvider } from "next-auth/react";
import styled from "styled-components";
import GlobalStyle from "../styles";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <SessionProvider session={session}>
          <AuthProvider>
            <TransactionsProvider>
              <Header style={{ gridArea: 'header' }} />
              <main style={{ gridArea: 'main' }}>
                <RulebaseProvider>
                  <ModalProvider>
                    <BackToTop />
                    <Component {...pageProps} />
                  </ModalProvider>
                </RulebaseProvider>
              </main>
              <Navigation style={{ gridArea: 'nav' }} />
            </TransactionsProvider>
          </AuthProvider>
        </SessionProvider>
      </AppWrapper>
    </>
  );
}

const AppWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  width: 100%;
  
  /* Mobile Layout */
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  grid-template-areas: 
    "header"
    "main"
    "nav";
  gap: 0;


  @media (min-width: 768px) {
    grid-template-rows: auto 1fr;
    grid-template-columns: 12.5rem 1fr;
    grid-template-areas:
      "header header"
      "nav main";
    max-width: none;
    margin: 0;
    gap: var(--xl);
 
    & > header {
      grid-area: header;
      z-index: 30;
    }

    & > main {
      grid-area: main;
      top: var(--5xl);
      position: relative;
      max-width: 53.125rem
    }

    & > nav {
      grid-area: nav;
      width: 12.5rem;
      top: 4.75rem;
      position: fixed;
      & ul {
        flex-direction: column;
        border-radius: var(--2xs);
        & li {
          border: 0;
        }
      }
    }
  }
`;
