import Header from "@/components/all/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-hover sm:flex justify-center items-center">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
      </Head>
      <div className="my-auto h-0 lg:h-auto hidden mt-40 lg:block">
        <p className="mt-4 text-2xl text-left">나의 마음을 확인하세요</p>
        <h2 className="text-left text-5xl font-bold text-[#117FFA]">
          이상형 월드컵
        </h2>
      </div>
      <div className="bg-white max-w-[480px] w-auto sm:min-w-[480px] mx-auto sm:mx-20  shadow-lg h-5/6">
        <div>
          <Header />
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default App;
//onTouchStart 기억할 것
