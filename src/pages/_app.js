import "@/styles/globals.css";
import Provider from "@/components/Provider";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import Header from "@/components/Header";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SWRConfig>
  );
}
