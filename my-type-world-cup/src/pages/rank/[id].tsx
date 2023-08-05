import GameSet from "@/components/all/GameSet";
import Table from "@/components/rank/Table";
import { rank_Data } from "@/type/Types";
import { GetServerSideProps } from "next";

export default function index({
	worldcupId
}: {
	worldcupId: number;
}) {
	const rankData: rank_Data = {
		worldCupId: worldcupId,
		password: null
	};

	return (
		<div className='h-auto shadow-lg '>
			<Table rankData={rankData} />
			<GameSet id={worldcupId} />
		</div>
	);
}

// GetServerSideProps를 사용하여 SSR을 설정합니다.
export const getServerSideProps: GetServerSideProps = async ({
	params
}) => {
	const worldcupId = params?.id as string; // 월드컵 ID를 받습니다.

	// 데이터 요청이 성공한 경우, worldcupId를 props로 반환합니다.
	return { props: { worldcupId } };
};
