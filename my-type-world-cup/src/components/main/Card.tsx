import Image from "next/image";
import GameButtons from "./GameButtons";

const Card = () => {
  return (
    <article className="border-main mt-4 mx-4 px-2 border-[1px] pb-4">
      <div className="flex justify-evenly mt-6">
        <div className="w-auto overflow-hidden">
          <div className="w-[175px] h-[175px] overflow-hidden">
            <Image
              src="https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/22/b7903101-048a-4375-bfcd-de61d3e70274.jpg"
              alt="연예인 사진"
              width={1000}
              height={1000}
              priority
            />
          </div>
          <h4 className="text-center font-medium">윈터</h4>
        </div>

        <div className="w-auto overflow-hidden">
          <div className="w-[175px] h-[175px] overflow-hidden flex">
            <Image
              src="data:image/jpeg;base64,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"
              alt="1st"
              width={1000}
              height={1000}
              priority
            />
          </div>
          <h4 className="text-center font-medium">카리나</h4>
        </div>
      </div>

      <h2 className="flex flex-col items-center mt-3 text-xl font-semibold">
        여돌 이상형 월드컵
      </h2>
      <p className="mx-4 text-center">
        2023년 여자아이돌 중 당신의 이상형은 누구인가요?
      </p>
      <GameButtons />
    </article>
  );
};

export default Card;
//고화질 사진쓰기
//1,2위 이미지, 제목, 설명
// 시작하기, 랭킹보기, 공유 버튼
