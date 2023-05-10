//game start button

import { FRONT_URL } from "@/lib/config";
import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import ShareModal from "./ShareModal";
const GameButtons = ({
  isreload = false,
  id,
}: {
  isreload?: boolean;
  id?: number;
}) => {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);

  const buttonHandler = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.value === "/") router.push("/");
    else router.push(`/${e.currentTarget.value}/${id}`);
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(FRONT_URL + "/game/" + id);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center mx-auto mt-4 h-10 w-full text-sm sm:text-lg text-white font-medium">
      <button
        type="button"
        value={"game"}
        onClick={(e) => buttonHandler(e)}
        className="bg-main px-2 h-10 sm:px-4   space-x-2 flex items-center rounded-lg hover:scale-110  cursor-pointer"
      >
        <Image src="/icon/start.svg" alt="start" width={17} height={20} />
        <p>{isreload ? "다시하기" : "시작하기"}</p>
      </button>

      {isreload ? (
        <button
          type="button"
          value={"/"}
          onClick={(e) => buttonHandler(e)}
          className="bg-main px-2 sm:px-4  h-10 flex items-center space-x-2 mx-2 rounded-lg hover:scale-110 cursor-pointer"
        >
          <Image
            src="/icon/whiteTrophy.svg"
            alt="ranking"
            width={23}
            height={23}
          />
          <p>홈화면</p>
        </button>
      ) : (
        <button
          type="button"
          value={"rank"}
          onClick={(e) => buttonHandler(e)}
          className="bg-main px-2 sm:px-4  h-10 flex items-center space-x-2 mx-2 rounded-lg hover:scale-110 cursor-pointer"
        >
          <Image src="/icon/ranking.svg" alt="ranking" width={27} height={27} />
          <p>랭킹보기</p>
        </button>
      )}

      <button
        type="button"
        value={"share"}
        onClick={() => handleCopyLink()}
        className="bg-main px-2 sm:px-4 h-10 flex items-center space-x-2 rounded-lg hover:scale-110 cursor-pointer"
      >
        <Image src="/icon/share.svg" alt="ranking" width={18} height={25} />
        <p>공유</p>
      </button>
      {<ShareModal message="복사되었습니다" isCopied={isCopied} />}
    </div>
  );
};

export default GameButtons;
