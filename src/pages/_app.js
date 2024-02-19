import "@/styles/globals.css";
import Provider from "@/components/Provider";

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />;
    </Provider>
  );
}
