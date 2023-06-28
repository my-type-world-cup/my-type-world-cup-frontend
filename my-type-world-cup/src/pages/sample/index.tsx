import { post_refresh } from "@/api/user";
import { accessTokenState } from "@/lib/atom/atom";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
export default function Index() {
  const accessToken = useRecoilValue(accessTokenState);
  useEffect(() => {
    if (accessToken) {
      post_refresh();
    }
  }, [accessToken]);
  return <div className="mt-20"></div>;
}
