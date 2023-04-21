//game start button

import Image from "next/image";
import { useRouter } from "next/router";
const GameButtons = () => {
  const router = useRouter();

  const buttonHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = e.currentTarget.value;
    console.log(buttonValue);
    // router.push("/game");
  };

  return (
    <div className="flex items-center justify-center mx-auto mt-4 h-10 w-full text-xl text-white font-medium ">
      <div className="bg-main px-4 h-10 flex items-center space-x-2 rounded-lg hover:scale-110  cursor-pointer">
        <Image src="/icon/start.svg" alt="start" width={17} height={15} />
        <button value={"game"} onClick={(e) => buttonHandler(e)}>
          시작하기
        </button>
      </div>
      <div className="bg-main px-4 h-10 flex items-center space-x-2 mx-2 rounded-lg hover:scale-110 cursor-pointer">
        <Image src="/icon/ranking.svg" alt="ranking" width={27} height={30} />
        <button value={"rank"} onClick={(e) => buttonHandler(e)}>
          랭킹보기
        </button>
      </div>
      <div className="bg-main px-4 h-10 flex items-center space-x-2 rounded-lg hover:scale-110 cursor-pointer">
        <Image src="/icon/share.svg" alt="ranking" width={18} height={15} />
        <button value={"share"} onClick={(e) => buttonHandler(e)}>
          공유
        </button>
      </div>
    </div>
  );
};

export default GameButtons;
