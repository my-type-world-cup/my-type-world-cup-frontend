import Editor from "@/components/editor/editorPanel/Editor";
import ImageUpload from "@/components/editor/ImageUpload";
import TabButtons from "@/components/editor/TabButton";
import { accessTokenState, postWorldcup } from "@/lib/atom/atom";
import type { Editor_step, Post_res } from "@/type/Types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const WorldCupEditor = () => {
  const saveWorldcup = useRecoilValue<Post_res | null>(postWorldcup);
  const accessToken = useRecoilValue<string | null>(accessTokenState);
  const [isNumber, setIsNumber] = useState<Editor_step>(1);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push("/"); // 홈으로 이동합니다.
    }
  }, [accessToken]);

  const content = (() => {
    switch (isNumber) {
      case 1:
        return <Editor setIsNumber={setIsNumber} />;
      case 2:
        return (
          <ImageUpload
            accessToken={accessToken}
            saveWorldcup={saveWorldcup}
            setIsNumber={setIsNumber}
          />
        );
    }
  })();
  return (
    <div className="pt-12 relative">
      <TabButtons isNumber={isNumber} setIsNumber={setIsNumber} />
      {content}
    </div>
  );
};

export default WorldCupEditor;
