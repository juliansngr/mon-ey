import { TransactionsProvider } from "@/utils/TransactionsContext/TransactionsContext";
import GlobalStyle from "../styles";

export default function App({ Component, pageProps }) {
  return (
    <>
      <TransactionsProvider>
        <GlobalStyle />
        <div className="layout-wrapper">
          {/* <header>Title</header> */}
          <main>
            <Component {...pageProps} />
          </main>
        </div>
      </TransactionsProvider>
    </>
  );
}
