import { message } from "antd";
import { ReactNode } from "react";
import Navbar from "./layout/Navbar";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  message.config({
    maxCount: 2,
  });
  return (
    <>
      <Navbar />
      <main className="mt-28">{children}</main>
    </>
  );
}
