import type { Step } from "@/components/editor/TabButton";
import TabButtons from "@/components/editor/TabButton";
import Editor from "@/components/editor/editor";
import { useState } from "react";
const WorldCupEditor = () => {
  const [isWord, setIsWord] = useState<Step>("first");
  const onSave = (title: string, description: string, isPublic: boolean) => {
    console.log(title, description, isPublic);
  };

  return (
    <div>
      <TabButtons isWord={isWord} setIsWord={setIsWord} />
      <Editor onSave={onSave} />
    </div>
  );
};

export default WorldCupEditor;
