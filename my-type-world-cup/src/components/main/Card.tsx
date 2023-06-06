import type { MainWorldcup } from "@/type/Types";

import Image from "next/image";
import GameButtons from "./GameButtons";
const Card = ({
  worldcup,
  mine = false,

  handlerDelete = () => {},

  handlerWorldCup = () => {},
}: {
  handlerDelete?: (id: number) => void;
  worldcup: MainWorldcup;
  mine?: boolean;

  handlerWorldCup?: (id: number) => void;
}) => {
  const id = worldcup.id;

  return (
    <article className="border-main mt-4 mx-4 px-2 border-[1px] pb-4">
      {worldcup.candidateSimpleResponseDtos.length === 2 && (
        <div className="flex justify-evenly mt-6">
          <div className="w-auto overflow-hidden">
            <div className="w-[175px] h-[175px] overflow-hidden flex items-center">
              <Image
                src={worldcup.candidateSimpleResponseDtos[0].image}
                alt="연예인 사진"
                width={1000}
                height={1000}
                priority
              />
            </div>
            <h4 className="text-center font-medium">윈터</h4>
          </div>

          <div className="w-auto overflow-hidden">
            <div className="w-[175px] h-[175px] overflow-hidden flex items-center">
              <Image
                src={worldcup.candidateSimpleResponseDtos[1].image}
                alt="1st"
                width={1000}
                height={1000}
                priority
              />
            </div>
            <h4 className="text-center font-medium">카리나</h4>
          </div>
        </div>
      )}

      <h2 className="flex flex-col items-center mt-3 text-xl font-semibold">
        {worldcup.title}
      </h2>
      <p className="mx-4 text-center">
        {worldcup.description.length > 100
          ? worldcup.description.slice(0, 100) + "..."
          : worldcup.description}
      </p>
      {worldcup.candidateSimpleResponseDtos.length === 2 && (
        <>
          <GameButtons id={id} />
        </>
      )}
      {mine && (
        <div className="flex flex-col justify-center items-center">
          <div className="my-4 text-white flex justify-evenly">
            <button
              onClick={() => handlerWorldCup(id)}
              className="flex items-center bg-main px-2 sm:px-4  h-10  space-x-2 mx-2 rounded-lg hover:scale-110 cursor-pointer"
            >
              <Image
                src="/icon/white_person.svg"
                alt="delete"
                className="mr-2 cursor-pointer"
                width={20}
                height={20}
                priority
              />
              후보 추가
            </button>
            <button
              onClick={() => handlerDelete(id)}
              className="flex items-center bg-main px-2 sm:px-4  h-10 space-x-2 mx-2 rounded-lg hover:scale-110 cursor-pointer"
            >
              <Image
                src="/icon/white_delete.svg"
                alt="delete"
                className="mr-2 cursor-pointer"
                width={20}
                height={20}
                priority
              />
              삭제하기
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default Card;
//고화질 사진쓰기
//1,2위 이미지, 제목, 설명
// 시작하기, 랭킹보기, 공유 버튼
