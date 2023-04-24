import Editor from "@/components/editor/Editor";
import type { Step } from "@/components/editor/TabButton";
import TabButtons from "@/components/editor/TabButton";
import { useState } from "react";
const WorldCupEditor = () => {
  const [isWord, setIsWord] = useState<Step>("first");
  const onSave = (title: string, description: string, isPublic: boolean) => {};

  return (
    <div className="pt-12">
      <TabButtons isWord={isWord} setIsWord={setIsWord} />
      <Editor onSave={onSave} />
    </div>
  );
};

export default WorldCupEditor;
