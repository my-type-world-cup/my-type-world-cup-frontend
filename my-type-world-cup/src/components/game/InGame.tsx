import { rank_result_fetch } from "@/api/post_rank";
import type { Contestant, Round, result_data } from "@/type/Types";
import Image from "next/image";
import {
	Dispatch,
	MutableRefObject,
	SetStateAction,
	useRef,
	useState
} from "react";
type Props = {
	isModal: [boolean, Round];
	twoPeople: Contestant[];
	randomContestant: () => void;
	setIsModal: Dispatch<SetStateAction<[boolean, Round]>>;
	winnerRef: MutableRefObject<Contestant[]>;
	matchRef: MutableRefObject<Contestant[]>;

	title: string;
	animationON: boolean;
	setAnimationON: Dispatch<SetStateAction<boolean>>;
	pickCandidateNum: number;
	setPickCandidateNum: Dispatch<SetStateAction<number>>;
	startON: boolean;
	setStartON: Dispatch<SetStateAction<boolean>>;
};

export default function InGame({
	isModal,
	twoPeople,
	randomContestant,
	setIsModal,
	winnerRef,
	matchRef,

	animationON,
	setAnimationON,
	setStartON,
	startON,
	setPickCandidateNum,
	pickCandidateNum,
	title
}: Props) {
	const isResult = useRef<result_data[]>([]);
	const [count, setCount] = useState<number>(1);
	const isButtonDisabledRef = useRef(false);

	const handleClick = async (num: number) => {
		if (isButtonDisabledRef.current) {
			return;
		}
		setAnimationON(false);
		isButtonDisabledRef.current = true; // 버튼 비활성화
		setPickCandidateNum(num);

		// 패자만 모와서 저장?
		//패자는 무조건 n경기당 n-1승을함
		//최종 승자는 마지막에 n경기당 n승임
		if (num === 0) {
			winnerRef.current = [...winnerRef.current, twoPeople[0]];
			isResult.current = [
				...isResult.current,
				{
					id: twoPeople[1].id,
					matchUpGameCount: count,
					winCount: count - 1
				}
			];
		} else if (num === 1) {
			winnerRef.current = [...winnerRef.current, twoPeople[1]];
			isResult.current = [
				...isResult.current,
				{
					id: twoPeople[0].id,
					matchUpGameCount: count,
					winCount: count - 1
				}
			];
		}

		if (
			matchRef.current.length === 0 &&
			winnerRef.current.length === 1
		) {
			// endRef.current = true;
			isResult.current = isResult.current.concat([
				{
					id: winnerRef.current[0].id,
					matchUpGameCount: count,
					winCount: count
				}
			]);

			await rank_result_fetch(isResult.current);

			setStartON(false);
			setAnimationON(true);
			return;
		} else if (matchRef.current.length === 0) {
			//다음 라운드로 넘어가기
			setCount((prev) => prev + 1);
			setIsModal((prev) => [prev[0], (prev[1] / 2) as Round]);
			matchRef.current = winnerRef.current;
			winnerRef.current = [];
		}

		setTimeout(() => {
			setAnimationON(true);
			// setIsCheck([true, 3]); //원위치.
			setStartON(true);
			randomContestant(); //다시뽑기
			isButtonDisabledRef.current = false; // 버튼 활성화
		}, 2200);
	};

	if (!startON) {
		return <></>;
	}

	return (
		<div className='relative'>
			<h2 className='text-white text-xl text-center h-4 mt-4 sm:mt-2'>
				{title} {isModal[1] === 2 ? `결승` : `${isModal[1]}강`}
			</h2>
			<div
				className='flex justify-center pt-2 sm:mt-4 mt-6'
				onClick={() => handleClick(0)}
				style={{
					transform: animationON
						? "translateY(0%)"
						: pickCandidateNum === 0
						? "translateY(35%)"
						: " translateX(150%)",
					transition:
						!animationON && pickCandidateNum === 0
							? "all 1s ease-in-out"
							: "all 0s",
					opacity: !animationON && pickCandidateNum === 1 ? "0" : "1"
				}}>
				<Image
					src={twoPeople[0].image}
					alt='이상형 1'
					width={330}
					height={330}
					priority
					className='cursor-pointer  sm:hover:scale-105  duration-300'
				/>
				<h3
					className='absolute text-white bottom-10 left-1/2 transform -translate-x-1/2 '
					style={{
						textShadow:
							"1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black"
					}}>
					{twoPeople[0].name}
				</h3>
			</div>
			<div
				className='absolute top-[53%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20'
				style={{
					transition: "transform 1s ease-in-out",
					visibility: !animationON ? "hidden" : "visible"
				}}>
				<Image
					src='/icon/vs.svg'
					alt='Picture of the author'
					width={40}
					height={40}
					className='mx-4'
				/>
			</div>
			<div
				className='flex justify-center '
				onClick={() => handleClick(1)}
				style={{
					transform: animationON
						? "translateY(0%)"
						: pickCandidateNum === 1
						? "translateY(-60%)"
						: "translateX(200%)",
					transition:
						!animationON && pickCandidateNum === 1
							? "transform 1s ease-in-out"
							: "",
					visibility:
						!animationON && pickCandidateNum === 0
							? "hidden"
							: "visible"
				}}>
				<Image
					src={twoPeople[1].image}
					alt='이상형 2'
					width={330}
					priority
					height={330}
					onClick={() => handleClick(1)}
					className='cursor-pointer sm:hover:scale-105 duration-300'
				/>
				<h3
					className='absolute text-white bottom-10 left-1/2 transform -translate-x-1/2 '
					style={{
						textShadow:
							"1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black"
					}}>
					{twoPeople[1].name}
				</h3>
			</div>
		</div>
	);
}
//먼저 2명을 고른다
//둘중 1명을 뽑으면 저장하고 , 새로 뽑는다.
//만약에 이제 후보가 없으면, 새로 뽑을 수가 없다.
//왜냐하면 업데이트 되기전에 새로 뽑아야한다.

//눌렀을 대 업데이트가 되지 않음,
