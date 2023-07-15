import { post_comments } from "@/api/user";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Dispatch, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenState, userState } from "../../lib/atom/atom";
import type { Contestant } from "../../type/Types";
import ShareModal from "../all/ShareModal";

type FormProps = {
  winner?: Contestant;
  setRendering: Dispatch<React.SetStateAction<boolean>>;
  rendering: boolean;
};

const Comment: React.FC<FormProps> = ({
  rendering,

  winner,
  setRendering,
}) => {
  const router = useRouter();
  const id = Number(router.query.id);
  const user = useRecoilValue(userState);
  const isButton = useRef<boolean>(true);
  const accessToken = useRecoilValue(accessTokenState);
  const [message, setMessage] = useState("");
  const [modalMessage, setmodalMessage] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [nickname, setnickname] = useState<string>("익명");

  useEffect(() => {
    if (user?.nickname) {
      setnickname(user.nickname);
    }
  }, [user]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message && isButton.current) {
      isButton.current = false;

      console.log(message, nickname);
      const comment: { content: string; worldCupId: number; winner?: string } =
        {
          content: message,
          worldCupId: id,
          ...(winner && { candidateName: winner.name }),
        };
      console.log(comment);

      setMessage("");
      post_comments(comment, accessToken)
        .then((data) => {
          setRendering(!rendering);
        })
        .catch((error) => console.error(error));
      isButton.current = true;
    }
  };

  const alram = () => {
    if (isCopied) return;
    if (user?.nickname) {
      setmodalMessage("회원정보에서 수정 가능합니다.");
    } else {
      setmodalMessage("닉네임은 회원만 가능합니다.");
    }
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <>
      <form
        className="flex flex-col bg-inputGray mt-4 px-4 pt-4 pb-8 "
        onSubmit={handleSubmit}
      >
        <label htmlFor="comment-input" className="mb-2 font-light text-lg">
          닉네임
        </label>
        <div className="w-full" onClick={() => alram()}>
          <input
            type="readonly"
            placeholder={nickname}
            className="w-full border-gray border rounded-md py-2 px-3 mb-2"
            value={nickname}
            disabled
          />
        </div>
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
      {
        <ShareModal
          message={modalMessage}
          isCopied={isCopied}
          setIsCopied={setIsCopied}
        />
      }
    </>
  );
};

export default Comment;
