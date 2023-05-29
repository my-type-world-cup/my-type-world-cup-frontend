import { post_refresh } from "@/api/user";
import { accessTokenState } from "@/lib/atom/atom";
import { useRecoilValue } from "recoil";
export default function Index() {
  const accessToken = useRecoilValue<string | null>(accessTokenState);
  console.log(accessToken);
  post_refresh(accessToken!);
  return <div>index</div>;
}
