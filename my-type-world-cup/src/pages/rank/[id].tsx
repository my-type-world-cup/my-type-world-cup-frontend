import GameSet from "@/components/all/GameSet";
import Table from "@/components/rank/Table";
import { rank_Data } from "@/type/Types";
import { GetStaticPaths, GetStaticProps } from "next";

export default function index({ worldcupId }: { worldcupId: number }) {
  const rankData: rank_Data = {
    worldCupId: worldcupId,
    password: null,
  };

  return (
    <div className="h-auto shadow-lg ">
      <Table rankData={rankData} />
      <GameSet id={worldcupId} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const worldcupId = params?.id as string;
  //worldcups/1

  return { props: { worldcupId } };
};
