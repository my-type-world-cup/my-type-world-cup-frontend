import MetaTags from "@/components/MetaTags";
import Header from "@/components/all/header/Header";
import { GA_TRACKING_ID } from "@/lib/config";
import { usePageView } from "@/lib/hooks/usePageview";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";

const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false
};

function App({ Component, pageProps }: AppProps) {
  usePageView();
  return (
    <>
      <div className="bg-hover flex justify-center items-center mt-[-1px] w-auto overflow-hidden">
        <Head>
          <title>이상형 월드컵</title>
          <link rel="icon" href="/icon/trophy.svg" />
          <link rel="mask-icon" href="/icon/trophy.svg" color="#000000" />
          <MetaTags />
        </Head>
        <Script id="gtag-init">
          {`
   					window.dataLayer = window.dataLayer || [];
    				function gtag(){dataLayer.push(arguments);}
   					 gtag('js', new Date());
  					  gtag('config', '${GA_TRACKING_ID}');
 					 `}
        </Script>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />

        {/* 웹화면 배경 */}
        <div className="my-auto h-0 lg:h-auto mt-40 mr-4 hidden lg:block">
          <p className="mt-4 text-2xl text-left">나의 마음을 확인하세요</p>
          <h2 className="text-left text-5xl font-bold text-[#117FFA]">
            이상형 월드컵
          </h2>
        </div>

        {/* 기본 화면 */}
        <RecoilRoot>
          <div className="bg-white max-w-[480px] w-full sm:min-w-[480px] mx-auto sm:mx-20 shadow-lg h-5/6">
            <Header />
            <div className="-mt-[63px]">
              <SWRConfig value={swrConfig}>
                <Component {...pageProps} />
              </SWRConfig>
            </div>
          </div>
        </RecoilRoot>
      </div>
    </>
  );
}

export default App;
//onTouchStart 기억할 것
