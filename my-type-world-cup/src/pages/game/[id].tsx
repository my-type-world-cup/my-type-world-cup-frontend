import InGame from "@/components/game/InGame";
import Modal from "@/components/game/InGameModal";
import Result from "@/components/game/Result";
import { getInitialRound } from "@/lib/Helper";
import { BACK_URL } from "@/lib/config";
import type { Round } from "@/type/Types";
import { Contestant, IngameModalData } from "@/type/Types";
import { GetServerSideProps } from "next";
import { useEffect, useRef, useState } from "react";
//40명이 있다면 2명을 뽑음
//32강 너무 헤비?
//32강이면 총 16번을 뽑고s
//승자는 저장 패자는 삭제
//-2 해주면서 체킹
//백업으로 저장
type Option = {
	label: string;
	value: string;
};

// 수적으면 제한되는 로직 생성해야함
const WorldCup = ({ data }: { data: IngameModalData }) => {
	const init: Round = getInitialRound(data.candidatesCount);
	const [isModal, setIsModal] = useState<[boolean, Round]>([
		true,
		init
	]);
	const [round, setRound] = useState<Number>(0);
	const [isCheck, setIsCheck] = useState<[boolean, number]>([
		true,
		3
	]); //3은 초기화//4는 끝
	// const [contestants, setContestants] =
	//   useState<Contestant[]>(initialContestants);
	const matchRef = useRef<Contestant[]>([]); //게임 캐릭터 넣기
	const [twoPeople, setTwoPeople] = useState<Contestant[]>([]);
	// const [winner, setWinner] = useState<Contestant[]>([]);
	const winnerRef = useRef<Contestant[]>([]);

	useEffect(() => {
		setRound(isModal[1]);
	}, [isModal]);

	const fetchContestants = async (
		password: string | null = null,
		teamCount: number = 16
	) => {
		const url = `${BACK_URL}/worldcups/${data.id}/candidates/random?teamCount=${teamCount}`;
		const bodyData = {
			worldCupId: data.id,
			password: password
		};
		console.log(bodyData, "데이터");
		const options: RequestInit = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(bodyData)
		};
		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error("Failed to fetch contestants");
			}
			const data = await response.json();
			matchRef.current = data;
			console.log(data, "안 데이터");
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	};

	const randomIndex = (el: number, length: number) => {
		let num = Math.floor(Math.random() * length);
		while (el === num) {
			num = Math.floor(Math.random() * length);
		}
		return num;
	};
	// 겹치지 않는 2명을 계속해서 뽑는 법
	// 새로운 배열로 업데이트가 되지않음
	const randomContestant = () => {
		// console.log(winnerRef.current, "안 위너", matchRef.current, "안 매치");
		const randomIndex1 = Math.floor(
			Math.random() * matchRef.current.length
		);
		const randomIndex2 = randomIndex(
			randomIndex1,
			matchRef.current.length
		);

		const randomContestant1 = matchRef.current[randomIndex1];
		const randomContestant2 = matchRef.current[randomIndex2];
		console.log(
			randomContestant1,
			"안 랜덤",
			randomContestant2,
			"안 랜덤2"
		);
		setTwoPeople([randomContestant1, randomContestant2]);

		matchRef.current = matchRef.current.filter(
			//2명을 빼줌
			(el) => el !== randomContestant1 && el !== randomContestant2
		);
		// console.log(matchRef.current, "안후 매치");
		// setContestants((el: Contestant[]) => {
		//   return el.filter(
		//     (el) => el !== randomContestant1 && el !== randomContestant2
		//   );
		// });
	};

	// console.log(isCheck, "안 엔드");
	return (
		<div className='h-auto shadow-lg'>
			{isCheck[1] !== 4 && (
				<div className='relative h-screen shadow-lg z-50'>
					<div className='bg-sweetBlack w-full h-full overflow-hidden'>
						{!isModal[0] && (
							<InGame
								isModal={isModal}
								twoPeople={twoPeople}
								randomContestant={() => randomContestant()}
								winnerRef={winnerRef}
								matchRef={matchRef}
								isCheck={isCheck}
								setIsCheck={setIsCheck}
								setIsModal={setIsModal}
							/>
						)}
					</div>
					<div
						className='absolute top-0 left-0 w-full h-screen bg-black opacity-70 z-10'
						style={{
							opacity: isModal[0] ? "0.7" : "0",

							transform: isModal[0]
								? "translate-x-0"
								: "translate-x-full",
							transition: "opacity 0.3s ease-in-out",
							pointerEvents: isModal[0] ? "auto" : "none"
						}}
					/>
					{isModal[0] && (
						<Modal
							fetchContestants={fetchContestants}
							data={data}
							init={init}
							isModal={isModal}
							setIsModal={setIsModal}
							randomContestant={() => randomContestant()}
						/>
					)}
				</div>
			)}
			{isCheck[1] === 4 && (
				<>
					<Result winnerRef={winnerRef} id={data.id} />
				</>
			)}
		</div>
	);
};

export default WorldCup;

//두가지 쿠션으로 생각해보자
export const getServerSideProps: GetServerSideProps = async ({
	params
}) => {
	const gameId = params?.id as string; // 게임 ID를 받습니다.

	// 서버로부터 데이터를 요청합니다.
	const res = await fetch(`${BACK_URL}/worldcups/${gameId}`);
	const data = await res.json();

	// 데이터 요청이 실패한 경우, notFound를 반환합니다.
	if (data.status === 404) {
		return { notFound: true };
	}

	// 데이터 요청이 성공한 경우, data를 props로 반환합니다.
	return { props: { data } };
};
