// pages/_app.js
import "styles/globals.css";
import "tailwindcss/tailwind.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_TITLE}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
