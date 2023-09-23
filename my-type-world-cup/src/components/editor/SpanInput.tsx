import type { Save_data } from "@/type/Types";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const SpanInput = ({
  name
}: {
  name: string;
  accessToken: string | null;
  item: Save_data;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(name);
  const [savedText, setSavedText] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (blurRef.current && !blurRef.current.contains(event.target)) {
        setIsEditing(false);
        setText(savedText);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [blurRef, setIsEditing, setText, savedText]);
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setSavedText(text);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setText(savedText);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="">
      {isEditing ? (
        <div ref={blurRef}>
          <input
            type="text"
            ref={inputRef}
            value={text}
            onChange={handleChange}
            spellCheck={false}
            className="w-full border border-gray p-2"
          />
          <div className="flex justify-end space-x-4 p-2">
            <span className="cursor-pointer" onClick={handleSave}>
              저장
            </span>
            <span className="cursor-pointer" onClick={handleCancel}>
              취소
            </span>
          </div>
        </div>
      ) : (
        <>
          <div
            className="text-gray hover:text-main w-full p-2 border"
            onClick={handleClick}
          >
            {savedText}
          </div>
          <div className="flex justify-end space-x-4 p-2">
            <span className="cursor-pointer" onClick={handleClick}>
              수정
            </span>
            <span className="cursor-pointer">삭제</span>
          </div>
        </>
      )}
    </div>
  );
};

export default SpanInput;
