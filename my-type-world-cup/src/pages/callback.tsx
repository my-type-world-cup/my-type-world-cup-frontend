import { fetchUserData } from "@/api/user";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { accessTokenState, lastPath, userState } from "../lib/atom/atom";
const dummy =
  "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJ3bnM0NTBAZ21haWwuY29tIiwic3ViIjoid25zNDUwQGdtYWlsLmNvbSIsImlhdCI6MTY4OTM4MDAwMCwiZXhwIjoxNjg5MDAwMDAwfQ.Q-6tO2FQ6rQ8IXZD8jm6f7AN45fG_qpj0zqjD4-C2Yc";

type Props = {};

export default function Callback({}: Props) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [lastPathState, setlastPathState] = useRecoilState(lastPath);
  const router = useRouter();
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if (accessToken) {
      fetchUserData(accessToken as string)
        .then((data) => {
          setUser(data);
          if (lastPathState) {
            router.replace(lastPathState); // 이전 페이지로 이동
            setlastPathState(null);
          }
        })
        .catch((error) => {
          // if (error === 401) {
          //   post_refresh()
          //     .then((data: any) => {
          //       setAccessToken(data.data);
          //       console.log(data.data);
          //     })
          //     .catch((error) => {
          //       console.error(error);
          //     });
          //   console.log("로그인 해야해~");
          // }

          console.error(error);
        });

      console.log("1");
    } else if (router.query.access_token) {
      console.log("2");
      setAccessToken(router.query.access_token as string); // 토큰 저장
    } else if (!router.query.access_token && !lastPathState) {
      console.log("3");
      router.replace("/"); // 토큰이 없고 이전 경로가 없으면 메인으로 이동
    }
  }, [router.query.access_token, accessToken, setAccessToken]);

  return <div className="mt-40">callback</div>;
}
