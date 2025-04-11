import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { ModalProvider } from "@/utils/ModalContext/ModalContext";
import { TransactionsProvider } from "@/utils/TransactionsContext/TransactionsContext";
import styled from "styled-components";
import GlobalStyle from "../styles";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <main>
        <TransactionsProvider>
          <Header />
          <ModalProvider>
            <Component {...pageProps} />
          </ModalProvider>
          <Navigation />
        </TransactionsProvider>
      </main>
    </>
  );
}

