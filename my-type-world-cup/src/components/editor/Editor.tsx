import { post_worldcup } from "@/api/user";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { accessTokenState, postWorldcup } from "../../lib/atom/atom";
import type { Post_req, Post_res } from "../../type/Types";
import type { Step } from "./TabButton";
interface EditorProps {
  setIsWord: React.Dispatch<React.SetStateAction<Step>>;
}

const Editor = ({ setIsWord }: EditorProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [password, setPassword] = useState<string | null>(null);
  const [worldcup, setWorldcup] = useRecoilState<Post_res | null>(postWorldcup);
  const accessToken = useRecoilValue(accessTokenState);
  console.log(worldcup, accessToken, "worldcup");
  useEffect(() => {
    setPassword(null);
  }, [isPublic]);

  const handleSave = () => {
    if (accessToken !== null && !!title && !!description) {
      const worldcup: Post_req = {
        title: title,
        description: description,
        password: password ? password : null,
      };
      setTitle("");
      setDescription("");
      setPassword(null);
      post_worldcup(accessToken!, worldcup!).then((res) => {
        setWorldcup(res);
        console.log(res);
        setIsWord("2");
      });
    }
  };

  const handlePublicChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.value === "public");
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setPassword(null);
    setWorldcup(null);
  };

  return (
    <div
      className="sm:pt-20 mt-4 sm:mt-8 mx-8 text-lg flex flex-col -pb-20 h-screen"
      // onSubmit={handleSubmit}
    >
      <label htmlFor="title">제목</label>
      <input
        type="text"
        className="border-b-[1px] border-main text-gray mt-1 pl-4"
        placeholder="이상형 월드컵의 제목을 입력해주세요"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <br />

      <label htmlFor="description" className="pt-8">
        설명
      </label>
      <textarea
        className="border-[1px] border-main mt-1 outline-none p-2"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        rows={3}
      />
      <br />

      {!isPublic && (
        <div className="flex justify-center flex-col pt-4">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            className="border-[1px] border-main text-gray mt-2 w-auto p-1 pl-4"
            maxLength={4}
            disabled={isPublic}
            placeholder="비밀번호를 입력해주세요"
            value={password ? password : ""}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
      )}
      <div className="flex justify-around items-center mt-6">
        <label className="flex items-center">
          <input
            type="radio"
            name="public"
            value="public"
            className="mr-3 w-6 h-6"
            checked={isPublic}
            onChange={handlePublicChange}
          />
          공개
        </label>

        <label className="flex items-center">
          <input
            type="radio"
            name="public"
            value="private"
            className="mr-3 w-6 h-6"
            checked={!isPublic}
            onChange={handlePublicChange}
          />
          비공개
        </label>
      </div>
      <button
        type="button"
        onClick={() => handleSave()}
        className="mt-20 px-4 py-2 bg-main text-white rounded-md hover:scale-105 transition-all"
      >
        저장
      </button>
      <button
        type="button"
        onClick={handleReset}
        className="mt-4 sm:mt-8 px-4 py-2 bg-main text-white rounded-md hover:scale-105 transition-all"
      >
        초기화
      </button>
    </div>
  );
};
export default Editor;
