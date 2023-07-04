import { fetchUserData } from "@/api/user";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { accessTokenState, lastPath, userState } from "../lib/atom/atom";
type Props = {};

export default function Callback({}: Props) {
  const setAccessToken = useSetRecoilState(accessTokenState);
  const lastPathState = useRecoilValue(lastPath);
  const router = useRouter();
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const accessToken = router.query.access_token as string;
    if (accessToken) {
      setAccessToken(accessToken as string); //토큰 저장
      fetchUserData(accessToken as string)
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error(error);
        });
      router.push(lastPathState as string); //이전페이지로 이동
    } else {
      router.push("/"); //토큰이 없으면 메인으로 이동
    }
    const handlePopstate = (event: PopStateEvent) => {
      const currentUrl = window.location.href;

      if (currentUrl.includes("/callback")) {
        // 현재 URL에 "/callback"이 포함되어 있는지 확인합니다.
        window.history.replaceState(null, "", "/"); // 홈으로 이동
      }
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [router]);

  return <div className="mt-40">callback</div>;
}
