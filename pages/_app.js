import { TransactionsProvider } from "@/utils/TransactionsContext/TransactionsContext";
import GlobalStyle from "../styles";

export default function App({ Component, pageProps }) {
  return (
    <>
      <TransactionsProvider>
        <GlobalStyle />

        <Component {...pageProps} />
      </TransactionsProvider>
    </>
  );
}
