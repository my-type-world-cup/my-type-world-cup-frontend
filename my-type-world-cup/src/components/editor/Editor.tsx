import useEditorState from "@/lib/hooks/useEditorState";
import { Dispatch, SetStateAction } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { accessTokenState, postWorldcup } from "../../lib/atom/atom";
import type { Editor_step, Post_res } from "../../type/Types";

import useEditorSaveAndReset from "@/lib/hooks/useEditorSaveAndReset";
interface EditorProps {
  setIsNumber: Dispatch<SetStateAction<Editor_step>>;
}

const Editor = ({ setIsNumber }: EditorProps) => {
  const [worldcup, setWorldcup] = useRecoilState<Post_res | null>(postWorldcup);
  const accessToken = useRecoilValue(accessTokenState);
  const {
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
  } = useEditorState(worldcup);

  const { handleSave, handleReset, handlePublicChange, handlePasswordChange } =
    useEditorSaveAndReset({
      setWorldcup,
      setIsNumber,
      accessToken,
      worldcup,
      setIsValid,
      setIsPublic,
      setTitle,
      setDescription,
      setPassword,
      title,
      description,
      isPublic,
      password
    });

  return (
    <div
      className="sm:pt-20 mt-4 sm:mt-8 mx-8 text-lg flex flex-col min-h-screen"
      // onSubmit={handleSubmit}
    >
      <label htmlFor="title" className="">
        제목
      </label>
      <input
        type="text"
        className="border-b-[1px] border-main mt-1 pl-2"
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
            placeholder="비밀번호 4자리를 입력해주세요"
            value={password ? password : ""}
            onChange={handlePasswordChange}
          />
          {!isValid && (
            <p className="text-error text-sm mt-1">
              4자리 숫자를 입력해주세요.
            </p>
          )}
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
        새로 만들기
      </button>
    </div>
  );
};
export default Editor;
