import { message } from "antd";
import { ReactNode } from "react";
import Navbar from "./layout/Navbar";
import Head from "next/head";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  message.config({
    maxCount: 2,
  });
  return (
    <>
      <Head>
        <title>Adidas - Just do it</title>
      </Head>
      <Navbar />
      <main className="mt-28">{children}</main>
    </>
  );
}
