import React, { useState } from "react";

type FormProps = {
  onSubmit: (nickname: string, message: string) => void;
};

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(nickname, message);
    setNickname("");
    setMessage("");
  };

  return (
    <form
      className="flex flex-col bg-gray-100 rounded-md p-4"
      onSubmit={handleSubmit}
    >
      <input
        placeholder="닉네임"
        className="border-gray-300 border rounded-md py-2 px-3 mb-2"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <label htmlFor="message-input" className="mb-2 font-bold text-lg">
        댓글 쓰기
      </label>
      <textarea
        id="message-input"
        placeholder="메세지를 입력하세요"
        className="border-gray-300 border rounded-md py-2 px-3 mb-4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        댓글 작성
      </button>
    </form>
  );
};

export default Form;
