//game start button

import Image from "next/image";
import { useRouter } from "next/router";
const GameButtons = ({ isreload = false }: { isreload: boolean }) => {
  const router = useRouter();

  const buttonHandler = () => {
    router.push("/game");
  };

  return (
    <div className="flex items-center justify-center mx-auto mt-4 h-10 w-full text-lg text-white font-medium">
      <div className="bg-main px-2 h-10 sm:px-4   space-x-2 flex items-center rounded-lg hover:scale-110  cursor-pointer">
        <Image src="/icon/start.svg" alt="start" width={17} height={20} />
        <button value={"game"} onClick={(e) => buttonHandler()}>
          {isreload ? "다시하기" : "시작하기"}
        </button>
      </div>
      <div className="bg-main px-2 sm:px-4  h-10 flex items-center space-x-2 mx-2 rounded-lg hover:scale-110 cursor-pointer">
        <Image src="/icon/ranking.svg" alt="ranking" width={27} height={27} />
        <button value={"rank"} onClick={(e) => buttonHandler()}>
          랭킹보기
        </button>
      </div>
      <div className="bg-main px-2 sm:px-4 h-10 flex items-center space-x-2 rounded-lg hover:scale-110 cursor-pointer">
        <Image src="/icon/share.svg" alt="ranking" width={18} height={25} />
        <button value={"share"} onClick={(e) => buttonHandler()}>
          공유
        </button>
      </div>
    </div>
  );
};

export default GameButtons;
