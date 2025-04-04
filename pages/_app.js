import { TransactionsProvider } from "@/utils/TransactionsContext/TransactionsContext";
import GlobalStyle from "../styles";
import { ModalProvider } from "@/utils/ModalContext/ModalContext";
import styled from "styled-components";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <LayoutWrapper>
        <PageBody>
          <TransactionsProvider>
            <ModalProvider>
              <Component {...pageProps} />
            </ModalProvider>
          </TransactionsProvider>
        </PageBody>
      </LayoutWrapper>
    </>
  );
}

const LayoutWrapper = styled.div`
  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: 3rem 1fr;
  grid-template-areas: "Header" "Main";
  min-height: 100vh;
`;

const PageBody = styled.main``;
