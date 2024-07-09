import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import client from "../apollo-client";
import Layout from "@/components/layout";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import { CartProvider } from "@/context/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <ApolloProvider client={client}>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </ApolloProvider>
    </ConfigProvider>
  );
}
