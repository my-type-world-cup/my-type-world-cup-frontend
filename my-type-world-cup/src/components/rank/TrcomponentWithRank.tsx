import type { Rank_res_data } from "@/type/Types";
import ImageContainer from "./ImageContainer";

// TrComponentWithRank 컴포넌트의 props 타입을 정의합니다.
type TrComponentWithRankProps = {
  rank: Rank_res_data;
  i: number;
  currentPage: number;
  pageSize: number;
  sort: string;
  zoomedHandler: (image: string) => void; // zoomedHandler의 함수 타입을 정의합니다.
};

type SortOptions = "finalWinCount" | "finalWinRatio" | "winCount" | "winRatio";

// calculateRatio 함수는 컴포넌트 외부에 선언합니다.
const calculateRatio = (WinCount: number, matchUpWorldCupCount: number) => {
  return matchUpWorldCupCount
    ? ((WinCount / matchUpWorldCupCount) * 100).toFixed(2)
    : 0;
};
const TrComponentWithRank = ({
  rank,
  i,
  currentPage,
  pageSize,
  sort,
  zoomedHandler
}: TrComponentWithRankProps) => {
  const classNameDecide = (SortOptions: SortOptions): string => {
    return sort === SortOptions
      ? "bg-inputGray text-center"
      : "text-gray text-center";
  };

  return (
    <tr className="border-hr border">
      <td className="text-center text-gray">
        {i + 1 + (currentPage - 1) * pageSize}
      </td>
      <td>
        <div className="overflow-hidden h-12 flex justify-center">
          <ImageContainer
            thumb={rank.thumb}
            image={rank.image}
            zoomedHandler={zoomedHandler}
          />
        </div>
      </td>
      <td className="text-gray">
        <div className="truncate w-20 text-center mx-auto text-xs">
          {rank.name}
        </div>
      </td>
      <td className={classNameDecide("finalWinCount")}>{rank.finalWinCount}</td>
      <td className={classNameDecide("finalWinRatio")}>
        {calculateRatio(rank.finalWinCount, rank.matchUpWorldCupCount)}%
      </td>
      <td className={classNameDecide("winCount")}>{rank.winCount}</td>
      <td className={classNameDecide("winRatio")}>
        {calculateRatio(rank.winCount, rank.matchUpGameCount)}%
      </td>
    </tr>
  );
};

export default TrComponentWithRank;
