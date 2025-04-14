import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { ModalProvider } from "@/utils/ModalContext/ModalContext";
import { TransactionsProvider } from "@/utils/TransactionsContext/TransactionsContext";
import GlobalStyle from "../styles";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <TransactionsProvider>
        <Header />
        <main>
          <ModalProvider>
            <Component {...pageProps} />
          </ModalProvider>
        </main>
        <Navigation />
      </TransactionsProvider>
    </>
  );
}

