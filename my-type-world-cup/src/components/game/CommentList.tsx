type Props = {};

export default function CommentList({}: Props) {
  return (
    <div className="font-thin text-gray bg-inputGray h-auto pb-4">
      <div className="flex justify-between mx-4 font-light">
        <h2 className="text-black text-sm">
          윈터솔저
          <span className="ml-2 text-gray">(윈터)&nbsp;&nbsp;29분 전</span>
        </h2>
        <span>좋아요</span>
      </div>
      <p className="mx-4 font-thin text-sm">우리 윈터 겨울 최고</p>

      <hr className="border-hr my-4" />
      <div className="flex justify-between mx-4 font-light">
        <h2 className="text-black text-sm">
          윈터솔저
          <span className="ml-2 text-gray">(윈터)&nbsp;&nbsp;29분 전</span>
        </h2>
        <span>좋아요</span>
      </div>
      <p className="mx-4 font-thin text-sm">우리 윈터 겨울 최고</p>

      <hr className="border-hr my-4" />
      <div className="flex justify-between mx-4 font-light">
        <h2 className="text-black text-sm">
          윈터솔저
          <span className="ml-2 text-gray">(윈터)&nbsp;&nbsp;29분 전</span>
        </h2>
        <span>좋아요</span>
      </div>
      <p className="mx-4 font-thin text-sm">우리 윈터 겨울 최고</p>

      <hr className="border-hr my-2" />
    </div>
  );
}
