// analytics.js

import { useRouter } from "next/router";
import { useEffect } from "react";
import * as gtag from "../gtag"; // 여기서 gtag는 위에서 정의한 Google Analytics 함수를 포함한 파일입니다.

export const usePageView = () => {
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = (url: URL) => {
			gtag.pageview(url);
		};

		// 라우터 이벤트에 이벤트 리스너를 붙입니다.
		router.events.on("routeChangeComplete", handleRouteChange);

		// 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);
};
