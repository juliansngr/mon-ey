import { TransactionsProvider } from "@/utils/TransactionsContext/TransactionsContext";
import GlobalStyle from "../styles";
import { ModalProvider } from "@/utils/ModalContext/ModalContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <TransactionsProvider>
        <ModalProvider>
          <GlobalStyle />
          <div className="layout-wrapper">
            {/* <header>Title</header> */}
            <main>
              <Component {...pageProps} />
            </main>
          </div>
        </ModalProvider>
      </TransactionsProvider>
    </>
  );
}
