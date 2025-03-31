import Head from "next/head";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Static Content CMS</title>
      </Head>
      <main className="p-8">{children}</main>
    </>
  );
}
