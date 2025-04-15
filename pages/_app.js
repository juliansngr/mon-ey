import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { ModalProvider } from "@/utils/ModalContext/ModalContext";
import { TransactionsProvider } from "@/utils/TransactionsContext/TransactionsContext";
import GlobalStyle from "../styles";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <SessionProvider session={session}>
        <TransactionsProvider>
          <Header />
          <main>
            <ModalProvider>
              <Component {...pageProps} />
            </ModalProvider>
          </main>
          <Navigation />
        </TransactionsProvider>
      </SessionProvider>
    </>
  );
}
