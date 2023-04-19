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

      <div className="bg-blue max-w-full lg:max-w-[375px] mx-auto ">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default App;
//onTouchStart 기억할 것
