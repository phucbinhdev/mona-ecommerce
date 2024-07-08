import { ReactNode } from "react";
import Navbar from "./layout/Navbar";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
