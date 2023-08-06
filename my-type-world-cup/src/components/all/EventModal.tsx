import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import loadingGif from "../../../public/icon/loading.gif";

type HandleDelete = () => void;

const EventModal = ({
	message, //메시지
	isCopied, // 모달 조건
	setIsCopied,

	img, //이미지
	handleDelete //이벤트
}: {
	isCopied: boolean;
	setIsCopied: Dispatch<SetStateAction<boolean>>;
	message: string;

	img: string;
	handleDelete: HandleDelete;
}) => {
	return (
		<div
			className={
				isCopied
					? "fixed left-0 top-0 w-full h-full z-50 flex justify-center items-center pointer-events-auto"
					: "fixed left-0 top-0 w-full h-full z-50 flex justify-center items-center pointer-events-none"
			}>
			<div
				className='absolute w-full h-full bg-black opacity-50'
				style={{
					opacity: isCopied ? 0.5 : 0,
					transition: "opacity 0.3s ease-out"
				}}
				onClick={() => {
					setIsCopied(false);
				}}
			/>

			<div
				className='fixed top-[25%] bg-main rounded-xl p-4 pt-6 z-50 flex justify-center items-center flex-col'
				style={{
					opacity: isCopied ? 1 : 0,
					transition: "opacity 0s"
				}}>
				{
					<Image
						src={img || loadingGif}
						alt={`choiceImage`}
						width={200}
						height={200}
						className='cursor-pointer'
					/>
				}
				{
					<>
						<p className='p-4 text-white'>{message}</p>
						<div className='flex gap-4 text-white'>
							<button
								className=' hover:scale-125 hover:text-lightBlue'
								onClick={() => handleDelete()}>
								예
							</button>
							<button
								className=' hover:scale-125 hover:text-lightBlue'
								onClick={() => setIsCopied(false)}>
								아니오
							</button>
						</div>
					</>
				}
			</div>
		</div>
	);
};
//정중앙에 띄우려면 상태관리 필요함
export default EventModal;
