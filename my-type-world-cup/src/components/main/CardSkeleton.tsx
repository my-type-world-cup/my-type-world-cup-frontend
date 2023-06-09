const CardSkeleton = () => {
  return (
    <article className="border-main mt-4 mx-4 px-2 border-[1px] pb-4">
      <div className="flex justify-evenly mt-6">
        <div className="w-auto overflow-hidden">
          <div className="skeleton w-[175px] h-[175px] overflow-hidden flex items-center bg-skeleton"></div>
        </div>

        <div className="w-auto overflow-hidden">
          <div className="skeleton w-[175px] h-[175px] overflow-hidden flex items-center bg-skeleton"></div>
        </div>
      </div>
      <div className="flex justify-center flex-col items-center mt-2">
        <div className="skeleton flex flex-col items-center mt-3 h-8 w-1/4 font-semibold bg-skeleton" />
        <div className="skeleton flex flex-col items-center mt-3 h-8 w-4/5 font-semibold bg-skeleton" />
      </div>
      <div className="flex justify-center mt-4 gap-7">
        <div className="skeleton w-1/4 h-10 bg-skeleton rounded-md" />
        <div className="skeleton w-1/4 h-10 bg-skeleton rounded-md" />
        <div className="skeleton w-1/4 h-10 bg-skeleton rounded-md" />
      </div>
    </article>
  );
};

export default CardSkeleton;
//고화질 사진쓰기
//1,2위 이미지, 제목, 설명
// 시작하기, 랭킹보기, 공유 버튼
