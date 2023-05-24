import Editor from "@/components/editor/Editor";
import ImageUpload from "@/components/editor/ImageUpload";
import type { Step } from "@/components/editor/TabButton";
import TabButtons from "@/components/editor/TabButton";
import { accessTokenState, postWorldcup } from "@/lib/atom/atom";
import { Post_res } from "@/type/Types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
const WorldCupEditor = () => {
  const saveWorldcup = useRecoilValue<Post_res | null>(postWorldcup);
  const accessToken = useRecoilValue<string | null>(accessTokenState);
  const [isWord, setIsWord] = useState<Step>("1");
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push("/"); // 홈으로 이동합니다.
    }
  }, [accessToken, router]);

  const content = (() => {
    switch (isWord) {
      case "1":
        return <Editor />;
      case "2":
        return <ImageUpload saveWorldcup={saveWorldcup} />;
      default:
        return null;
    }
  })();
  return (
    <div className="pt-12 relative">
      <TabButtons isWord={isWord} setIsWord={setIsWord} />

      {content}
    </div>
  );
};

export default WorldCupEditor;
