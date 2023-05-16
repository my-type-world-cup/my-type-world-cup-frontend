import { BACK_URL } from "@/lib/config";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Dispatch, useRef, useState } from "react";
import type { Contestant } from "../../type/Types";
type FormProps = {
  onSubmit?: (nickname: string, message: string) => void;
  winner?: Contestant;
  setRendering: Dispatch<React.SetStateAction<boolean>>;
  rendering: boolean;
};

const Comment: React.FC<FormProps> = ({
  rendering,
  onSubmit,
  winner,
  setRendering,
}) => {
  const router = useRouter();
  const id = Number(router.query.id);

  const isButton = useRef<boolean>(true);
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  console.log(winner, "winner", id);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message && isButton.current) {
      isButton.current = false;

      console.log(message, nickname);
      const comment = {
        content: message,
        worldCupId: id,
        ...(winner && { candidateName: winner.name }),
      };
      console.log(comment);
      setNickname("");
      setMessage("");
      fetch(`${BACK_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      })
        .then((response) => response.json())
        .then((data) => {
          setRendering(!rendering);
        })
        .catch((error) => console.error(error));
      isButton.current = true;
    }
  };

  return (
    <form
      className="flex flex-col bg-inputGray mt-4 px-4 pt-4 pb-8 "
      onSubmit={handleSubmit}
    >
      <label htmlFor="comment-input" className="mb-2 font-light text-lg">
        닉네임
      </label>
      <input
        placeholder="익명"
        className=" border-gray border rounded-md py-2 px-3 mb-2"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        disabled
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

export default Comment;
