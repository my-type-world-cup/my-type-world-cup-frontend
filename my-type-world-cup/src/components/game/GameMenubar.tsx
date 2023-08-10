import type { Round } from "@/type/Types";

import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
	isModal: [boolean, Round];
	setIsModal: Dispatch<SetStateAction<[boolean, Round]>>;
	init: Round;
};

export default function GameMenubar({
	isModal,
	setIsModal,
	init
}: Props) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	const handleRoundSelect = (round: Round) => {
		setIsModal((el) => {
			return [el[0], round];
		});
		setIsOpen(false);
	};
	const rounds: Round[] = [32, 16, 8, 4].filter(
		(el) => el <= init
	) as Round[];
	3;

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			<div
				className='w-10/12 border-[1px] mt-2 items-center h-8 border-gray flex justify-between px-4 cursor-pointer'
				onClick={handleClick}>
				<h3 className=' py-1 text-sm '>{isModal[1]}강</h3>
				<Image
					src='/icon/down.svg'
					alt='arrow'
					width={15}
					height={10}
				/>
			</div>
			<div className='relative w-full'>
				<nav
					className='absolute top-0 left-[8.5%] w-10/12 bg-white shadow-lg rounded-b-lg p-2 border-[1px] border-gray z-50 '
					style={{
						display: isOpen ? "block" : "none",
						transition: "all 0.5s ease-in-out"
					}}>
					{rounds.map((round: Round) => (
						<button
							key={round}
							className='w-full h-6 text-sm text-left hover:bg-gray-200 px-2 hover:bg-main '
							onClick={() => handleRoundSelect(round)}>
							{round}강
						</button>
					))}
				</nav>
				{isOpen && (
					<div
						className='fixed inset-0 opacity-1 z-40 pointer-events-auto'
						onClick={handleClose}
					/>
				)}
			</div>
		</>
	);
}

//비밀번호 설정
