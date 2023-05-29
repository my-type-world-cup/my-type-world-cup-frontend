import type { rank_Data } from "../../type/Types";
import GameButtons from "../main/GameButtons";
import Table from "../rank/Table";
import type { Step } from "./TabButton";
type Props = {
  id?: number;

  setIsNumber: React.Dispatch<React.SetStateAction<Step>>;
};

export default function FinalEditor({ id, setIsNumber }: Props) {
  if (!id) {
    setIsNumber("1");
  }
  const rankData: rank_Data = {
    worldCupId: id || 0,
    password: null,
  };
  return (
    <>
      <div className="h-auto mt-28 ">
        <h3 className="text-center text-xl -mb-14  ">
          여자 아이돌 월드컵 우승자
        </h3>
        <Table rankData={rankData} />
        <GameButtons isreload={false} id={id} />
      </div>
    </>
  );
}
