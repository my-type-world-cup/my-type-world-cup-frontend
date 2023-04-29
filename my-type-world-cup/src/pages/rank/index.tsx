import GameSet from "@/components/all/GameSet";
import Table from "@/components/rank/Table";
import { rankDummy } from "@/lib/Dummy";
export default function index() {
  console.log(rankDummy);
  return (
    <div className="h-screen shadow-lg">
      <Table />
      <GameSet />
    </div>
  );
}
