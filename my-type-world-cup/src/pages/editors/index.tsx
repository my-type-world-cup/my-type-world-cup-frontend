import Editor from "@/components/editor/Editor";
import ImageUpload from "@/components/editor/ImageUpload";
import type { Step } from "@/components/editor/TabButton";
import TabButtons from "@/components/editor/TabButton";
import { postWorldcup } from "@/lib/atom/atom";
import { Post_worldcup } from "@/type/Types";
import { useState } from "react";
import { useRecoilState } from "recoil";
const WorldCupEditor = () => {
  const [worldcup, setWorldcup] = useRecoilState<Post_worldcup | null>(
    postWorldcup
  );
  const [isWord, setIsWord] = useState<Step>("1");

  const content = (() => {
    switch (isWord) {
      case "1":
        return <Editor />;
      case "2":
        return <ImageUpload />;
      default:
        return null;
    }
  })();
  return (
    <div className="pt-12">
      <TabButtons isWord={isWord} setIsWord={setIsWord} />

      {content}
    </div>
  );
};

export default WorldCupEditor;
