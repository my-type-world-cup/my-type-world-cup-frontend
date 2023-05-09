type Props = {};

export default function CommentList({}: Props) {
  return (
    <div className="font-thin text-gray bg-inputGray h-auto pb-4">
      <div className="flex justify-between mx-4 font-light">
        <h2 className="text-black text-sm">
          윈터솔저
          <span className="ml-2 text-gray">(윈터)&nbsp;&nbsp;29분 전</span>
        </h2>
        <span className="text-main font-bold">좋아요</span>
      </div>
      <p className="mx-4 font-thin text-sm">우리 윈터 겨울 최고</p>

      <hr className="border-hr my-4" />
      <div className="flex justify-between mx-4 font-light">
        <h2 className="text-black text-sm">
          윈터솔저
          <span className="ml-2 text-gray">(윈터)&nbsp;&nbsp;29분 전</span>
        </h2>
        <span>
          <span className="text-main text-sm font-bold">좋아요 27</span>
        </span>
      </div>
      <p className="mx-4 font-thin text-sm">우리 윈터 겨울 최고</p>

      <hr className="border-hr my-4" />
      <div className="flex justify-between mx-4 font-light">
        <h2 className="text-black text-sm">
          윈터솔저
          <span className="ml-2 text-gray">(윈터)&nbsp;&nbsp;29분 전</span>
        </h2>
        <span className="text-gray text-sm hover:font-bold hover:scale-105 hover:text-main">
          좋아요 27
        </span>
      </div>
      <p className="mx-4 font-thin text-sm">우리 윈터 겨울 최고</p>

      <hr className="border-hr my-2" />
    </div>
  );
}
