import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { ModalProvider } from "@/contexts/ModalContext/ModalContext";
import { TransactionsProvider } from "@/contexts/TransactionsContext/TransactionsContext";
import GlobalStyle from "../styles";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/contexts/AuthContext/AuthContext";
import { useRouter } from "next/router";

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
            <Header />
            <main>
              <ModalProvider>
                <Component {...pageProps} />
              </ModalProvider>
            </main>
            <Navigation />
          </TransactionsProvider>
        </AuthProvider>
      </SessionProvider>
    </>
  );
}
