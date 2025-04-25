import AppWrapper from "@/components/AppWrapper";
import BackToTop from "@/components/BackToTop";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/contexts/AuthContext/AuthContext";
import { ModalProvider } from "@/contexts/ModalContext/ModalContext";
import { RulebaseProvider } from "@/contexts/RulebaseContext/RulebaseContext";
import { TransactionsProvider } from "@/contexts/TransactionsContext/TransactionsContext";
import { SessionProvider } from "next-auth/react";
import GlobalStyle from "../styles";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <GlobalStyle />
      <SessionProvider session={session}>
        <AuthProvider>
          <TransactionsProvider>
            <AppWrapper>
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
            </AppWrapper>
          </TransactionsProvider>
        </AuthProvider>
      </SessionProvider>
    </>
  );
}

