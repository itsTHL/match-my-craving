import "@/styles/globals.css";
import Provider from "@/components/Provider";
import { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </SWRConfig>
  );
}
