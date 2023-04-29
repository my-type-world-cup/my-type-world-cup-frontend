type Props = {};

export default function CommentList({}: Props) {
  return (
    <div className="font-thin text-gray bg-inputGray">
      <div className="flex justify-between mx-4 font-light">
        <h2 className="text-black text-sm">
          윈터솔저
          <span className="ml-2 text-gray">(윈터)&nbsp;&nbsp;29분 전</span>
        </h2>
        <span></span>
      </div>
      <p className="mx-4 font-thin text-sm">우리 윈터 겨울 최고</p>

      <div className="flex justify-between mx-4 mt-2 font-light">
        <h2 className="text-black text-sm">
          윈터솔저
          <span className="ml-2 text-gray">(윈터)&nbsp;&nbsp;29분 전</span>
        </h2>
        <span></span>
      </div>
      <p className="mx-4 font-thin text-sm">우리 윈터 겨울 최고</p>

      <div className="flex justify-between mx-4 mt-2 font-light">
        <h2 className="text-black">
          윈터솔저{" "}
          <span className="ml-2 text-gray">(윈터)&nbsp;&nbsp;29분 전</span>
        </h2>
        <span></span>
      </div>
      <p className="mx-4 font-thin text-sm">우리 윈터 겨울 최고</p>
    </div>
  );
}
