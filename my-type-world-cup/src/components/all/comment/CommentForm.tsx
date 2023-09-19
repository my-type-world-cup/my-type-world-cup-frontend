import { post_comment } from "@/api/user";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Dispatch, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenState, userState } from "../../../lib/atom/atom";
import type { Contestant } from "../../../type/Types";
import ShareModal from "../modal/ShareModal";

type FormProps = {
  winner?: Contestant;
  setRendering: Dispatch<React.SetStateAction<boolean>>;
  rendering: boolean;
};

const CommentForm: React.FC<FormProps> = ({
  rendering,

  winner,
  setRendering
}) => {
  // React Router와 Recoil 상태를 사용합니다.
  const router = useRouter();
  const id = Number(router.query.id);
  const user = useRecoilValue(userState);
  const accessToken = useRecoilValue(accessTokenState);

  // 상태를 관리합니다.
  const [message, setMessage] = useState("");
  const [modalMessage, setmodalMessage] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [nickname, setnickname] = useState<string>("익명");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 유저의 닉네임이 있다면 nickname 상태를 업데이트합니다.
  useEffect(() => {
    if (user?.nickname) {
      setnickname(user.nickname);
    }
  }, [user]);

  // 댓글을 제출하는 함수입니다
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message && !isLoading) {
      setIsLoading(true);

      const comment: { content: string; worldCupId: number; winner?: string } =
        {
          content: message,
          worldCupId: id,
          ...(winner && { candidateName: winner.name })
        };

      setMessage("");

      try {
        await post_comment(comment, accessToken); // API 호출
        setRendering(!rendering);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false); // 로딩 종료
        }, 300);
      }
    }
  };

  // 닉네임 클릭 시, 변경 조건을 알려줍니다
  const alram = () => {
    if (modalVisible) return;
    setModalVisible(true);
    if (user?.nickname) {
      setmodalMessage("회원정보에서 수정 가능합니다.");
    } else {
      setmodalMessage("닉네임은 회원만 가능합니다.");
    }

    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  };

  return (
    <>
      <form
        className="flex flex-col bg-inputGray mt-4 px-4 pt-4 pb-8 "
        onSubmit={handleSubmit}
      >
        {/* 닉네임 라벨 필드 */}
        <label htmlFor="comment-input" className="mb-2 font-light text-lg">
          닉네임
        </label>
        <div className="w-full" onClick={() => alram()}>
          <input
            type="text"
            readOnly
            placeholder={nickname}
            className="cursor-default w-full bg-inputGray border-gray border rounded-md py-2 px-3 mb-2"
            value={nickname}
          />
        </div>

        {/* 댓글 작성 라벨 및 입력 필드 */}
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

        {/* 댓글 작성 버튼 */}
        <button
          type="submit"
          className="bg-main hover:bg-inputHover flex justify-center items-center text-white font-bold py-2 px-4 rounded"
        >
          {isLoading ? (
            <>로딩중입니다.</>
          ) : (
            <>
              <Image
                className="mr-2"
                src="/icon/pen.svg"
                alt="submit"
                width={16}
                height={12}
              />
              댓글 작성
            </>
          )}
        </button>
      </form>

      {/* 닉네임 변경조건 알려주는 모달 창 */}
      <ShareModal
        message={modalMessage}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default CommentForm;
