import type { Post_res } from "@/type/Types";
import { useEffect, useState } from "react";

const useEditorState = (initialWorldcup: Post_res | null) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [password, setPassword] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    if (initialWorldcup !== null) {
      setTitle(initialWorldcup.title);
      setDescription(initialWorldcup.description);
      setIsPublic(initialWorldcup.password === null);
      setPassword(initialWorldcup.password);
    }
  }, [initialWorldcup]);

  useEffect(() => {
    //비공개 -> 공개 전환시 초기화
    if (isPublic) setPassword(null);
  }, [isPublic]);
  return {
    title,
    setTitle,
    description,
    setDescription,
    isPublic,
    setIsPublic,
    password,
    setPassword,
    isValid,
    setIsValid
  };
};

export default useEditorState;
