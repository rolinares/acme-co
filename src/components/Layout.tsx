import Head from "next/head";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Welcome to Acme</title>
      </Head>
      <main className="p-8">{children}</main>
    </>
  );
}
