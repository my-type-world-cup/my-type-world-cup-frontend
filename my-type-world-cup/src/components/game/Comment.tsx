import Image from "next/image";
import React, { useState } from "react";
type FormProps = {
  onSubmit?: (nickname: string, message: string) => void;
};

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setNickname("");
    setMessage("");
  };

  return (
    <form
      className="flex flex-col bg-inputGray mt-12 px-4 py-8 "
      onSubmit={handleSubmit}
    >
      <input
        placeholder="닉네임"
        className=" border-gray border rounded-md py-2 px-3 mb-2"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <label htmlFor="comment-input" className="mb-2 font-light text-lg">
        댓글 쓰기
      </label>
      <textarea
        id="comment-input"
        placeholder="메세지를 입력하세요"
        className="border-gray border rounded-md py-2 px-3 mb-4 outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="bg-main hover:bg-inputHover flex justify-center items-center text-white font-bold py-2 px-4 rounded"
      >
        <Image
          className="mr-2"
          src="/icon/pen.svg"
          alt="submit"
          width={16}
          height={12}
        />
        댓글 작성
      </button>
    </form>
  );
};

export default Form;
