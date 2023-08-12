import { fetchContestants } from "@/api/user";
import type { Contestant, Round } from "@/type/Types";
import { IngameModalData } from "@/type/Types";
import Image from "next/image";
import {
	Dispatch,
	MutableRefObject,
	SetStateAction,
	useState
} from "react";
import GameMenubar from "./GameMenubar";
type Props = {
	isModal: [boolean, Round];
	setIsModal: Dispatch<SetStateAction<[boolean, Round]>>;
	randomContestant: () => void;
	data: IngameModalData;
	init: Round;
	matchRef: MutableRefObject<Contestant[]>;
};

export default function Modal({
	isModal,
	setIsModal,
	randomContestant,

	matchRef,
	data,
	init
}: Props) {
	const [error, setError] = useState<boolean>(false); // 비밀번호가 틀렸을 때 에러 처리
	const [password, setPassword] = useState<string | null>(null);

	const handleClick = async (
		password: string | null,
		teamCount: number
	) => {
		const success = await fetchContestants(
			password,
			teamCount,
			data.id,
			matchRef
		);

		if (success) {
			randomContestant();
			setIsModal((el) => [false, el[1]]);
		} else {
			setError(true);
		}
	};

	console.log(data);
	return (
		<div className='absolute top-2/4 rounded-3xl left-1/2 z-20 flex flex-col justify-center items-center transform -translate-x-1/2 -translate-y-1/2 bg-white h-4/6 sm:h-3/6 w-3/4'>
			<Image
				src='/icon/trophy.svg'
				alt='Mypage'
				className='mt-4 sm:mt-4'
				width={80}
				height={83}
			/>
			<h2 className='text-main mt-2 text-xl break-all mx-6'>
				{data?.title}
			</h2>
			<p className='mt-2 text-sm break-all w-10/12 h-auto min-h-8 mb-4'>
				{data?.description}
			</p>
			{data.candidatesCount >= 4 ? (
				<>
					<p className='mt-2 sm:mt-8 text-sm break-all w-10/12'>
						라운드를 선택해주세요
					</p>
					<GameMenubar
						isModal={isModal}
						setIsModal={setIsModal}
						init={init}
					/>
					<p className='mt-2 text-sm break-all w-10/12 font-medium'>
						총 {data.candidatesCount}명의 후보 중 {isModal[1]}명과
						대결합니다
					</p>
					{!data.visibility && (
						<input
							className='mt-2 sm:mt-4 w-10/12 h-8 px-4 border-[1px] text-sm border-gray '
							type='password'
							disabled={data.visibility}
							maxLength={4} // 최대 4자리까지 입력 가능하도록 설정
							pattern='[0-9]*' // 숫자만 입력 가능하도록 설정
							placeholder={
								data.visibility
									? "비밀번호는 없습니다"
									: "비밀번호를 입력해주세요"
							}
							onChange={(e) => {
								setPassword(e.target.value);
								setError(false);
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleClick(password, isModal[1]);
								}
							}}
						/>
					)}

					{!data.visibility &&
						(error ? (
							<div className='ml-2 flex gap-1 w-10/12 text-error text-sm mt-1'>
								<Image
									src='/icon/error.svg'
									alt='error'
									width={15}
									height={15}
								/>{" "}
								비밀번호가 틀렸습니다.
							</div>
						) : (
							<div className='w-10/12 text-sm mt-1 '>
								4자리의 숫자를 입력해주세요
							</div>
						))}

					<button
						onClick={() => handleClick(password, isModal[1])}
						type='button'
						className='bg-main px-4 mt-8 sm:mt-4 mb-4 h-10 text-white flex items-center space-x-2 rounded-lg hover:scale-110  cursor-pointer'>
						<Image
							src='/icon/start.svg'
							alt='start'
							width={17}
							height={20}
						/>
						<p className='text-lg'>시작하기</p>
					</button>
				</>
			) : (
				<div className='mx-4'>
					현재 인원이
					<span className='text-error'>{data.candidatesCount}명</span>
					이어서 게임을 시작할 수 없습니다 후보를 등록해주세요
				</div>
			)}
		</div>
	);
}
