import Header from "@/components/ui/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
// _app.js 파일 내
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
      </Head>

      <div className="bg-blue max-w-full sm:max-w-[480px] mx-auto">
        <div>
          <Header />
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default App;
//onTouchStart 기억할 것
