import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import client from "../apollo-client";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </ApolloProvider>
  );
}
