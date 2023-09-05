import MetaTags from "@/components/MetaTag";
import Header from "@/components/all/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import * as gtag from '../lib/gtag';

const swrConfig = {
	revalidateOnFocus: false,
	revalidateOnReconnect: false
};

function App({ Component, pageProps }: AppProps) {
	  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);




  return (
		<div className="bg-hover flex justify-center items-center mt-[-1px] w-auto overflow-hidden">
			<Head>
				<title>이상형 월드컵</title>
				<link rel="icon" href="/icon/trophy.svg" />
				<link rel="mask-icon" href="/icon/trophy.svg" color="#000000" />
				<MetaTags />
			</Head>
			  <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
			<div className="my-auto h-0 lg:h-auto mt-40 mr-4 hidden lg:block">
				<p className="mt-4 text-2xl text-left">나의 마음을 확인하세요</p>
				<h2 className="text-left text-5xl font-bold text-[#117FFA]">
					이상형 월드컵
				</h2>
			</div>
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
	);
}

export default App;
//onTouchStart 기억할 것
