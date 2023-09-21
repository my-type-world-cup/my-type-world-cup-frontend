// TitleInput.tsx
import React, { ChangeEvent } from "react";

interface TitleInputProps {
  title: string;
  setTitle: (title: string) => void;
}

const EditorTitleInput: React.FC<TitleInputProps> = ({ title, setTitle }) => (
  <>
    <label htmlFor="title">제목</label>
    <input
      type="text"
      className="border-b-[1px] border-main mt-1 pl-2"
      placeholder="이상형 월드컵의 제목을 입력해주세요"
      value={title}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        setTitle(event.target.value)
      }
    />
    <br />
  </>
);

export default EditorTitleInput;
