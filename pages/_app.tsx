import { Layout } from "@/components/layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import { useState } from "react";
import Loader from "@/components/loader";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });

  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });

  if (isLoading) {
    return <Loader type="bars" color="black" />;
  }

  return (
    <Layout>
      <section className="p-2">
        <Component {...pageProps} />
      </section>
    </Layout>
  );
}
