import Header from "@/components/all/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-hover flex justify-center items-center mt-[-1px] w-auto overflow-hidden">
      <Head>
        <title>이상형 월드컵</title>
        <link rel="icon" href="/icon/trophy.svg" />
        <link rel="mask-icon" href="/icon/trophy.svg" color="#000000" />
        <meta
          name="title"
          content="이상형 월드컵 Dolpick: 당신의 이상형을 찾아보세요! 🐬"
        />
        <meta
          name="description"
          content="Dolpick에서는 다양한 주제의 이상형 월드컵을 경험할 수 있습니다. 당신의 이상형은 무엇인가요? 이제 Dolpick에서 찾아보세요!"
        />
        <meta name="keywords" content="이상형 월드컵, 이상형, 월드컵" />
        <meta name="author" content="Dolpick" />
        <meta name="subject" content="이상형 월드컵" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@dolpick" />
        <meta name="twitter:title" content="🐬 이상형 월드컵 Dolpick 🐬" />

        <meta
          itemProp="image"
          content="https://velog.velcdn.com/images/wns450/post/75b80a2a-510a-49b4-a6cb-91a048ff53d5/image.jpeg"
        />

        {/* open graph */}
        <meta property="og:title" content="🐬 이상형 월드컵 Dolpick 🐬" />

        <meta
          property="og:description"
          content="당신의 이상형을 찾는 이상형 월드컵 사이트입니다!"
        />
        <meta property="og:site_name" content="Dolpick" />
        <meta
          property="og:image"
          content="https://velog.velcdn.com/images/wns450/post/75b80a2a-510a-49b4-a6cb-91a048ff53d5/image.jpeg"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dolpick.com" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
            <SWRConfig
              value={{
                revalidateOnFocus: false,
                revalidateOnReconnect: false,
              }}
            >
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
