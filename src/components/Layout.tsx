import Head from "next/head";
import { ReactNode } from "react";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Welcome to Acme</title>
      </Head>
      <main className="p-8">
        <button
          onClick={() => router.back()}
          className="mb-5 px-4 py-2 bg-transparent text-white font-semibold rounded-lg shadow-md transition cursor-pointer"
        >
          ⬅ Back
        </button>
        {children}
      </main>
    </>
  );
}
