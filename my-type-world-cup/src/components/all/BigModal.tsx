import Image from "next/image";
import loadingGif from "../../../public/icon/loading.gif";
const BigModal = ({
	message,
	isCopied,
	setIsCopied,
	setIsMake,
	img,
	uploadHandler,
	loading,
	setLoading
}: {
	setIsMake?: React.Dispatch<React.SetStateAction<boolean>>;
	setIsCopied: React.Dispatch<React.SetStateAction<boolean>>;
	message: string;
	isCopied: boolean;
	img: string;
	uploadHandler: (image: string) => void;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	return (
		<div
			className={
				isCopied
					? "absolute left-[0px] top-0 w-full h-full z-50 flex justify-center items-center pointer-events-auto"
					: "absolute left-[0px] top-0 w-full h-full z-50 flex justify-center items-center pointer-events-none"
			}>
			<div
				className="absolute w-full bg-black opacity-50"
				style={{
					opacity: isCopied ? 0.5 : 0,
					transition: "opacity 0.3s ease-out",
					height: "calc(100% + 40px)"
				}}
				onClick={() => {
					if (!loading) setIsCopied(false);
				}}
			/>

			<div
				className="fixed top-[25%] bg-main rounded-xl p-4 pt-6 z-50 flex justify-center items-center flex-col"
				style={{
					opacity: isCopied ? 1 : 0,
					transition: "opacity 0.3s ease-out"
				}}>
				{!!img && loading ? (
					<>
						<Image
							src={loadingGif}
							alt={"loading"}
							width={200}
							height={200}
							className=""
						/>
					</>
				) : (
					<Image
						src={img || loadingGif}
						alt={`choiceImage`}
						width={200}
						height={200}
						className="cursor-pointer"
					/>
				)}
				{!loading ? (
					<>
						<p className="p-4 text-white">{message}</p>
						<div className="flex gap-4 text-white">
							<button
								className=" hover:scale-125 hover:text-lightBlue"
								onClick={() => uploadHandler(img)}>
								예
							</button>
							<button
								className=" hover:scale-125 hover:text-lightBlue"
								onClick={() => setIsCopied(false)}>
								아니오
							</button>
						</div>
					</>
				) : (
					<>
						<p className="p-4 mt-8 text-white">
							고화질 사진은 1~2분 소요됩니다
						</p>
						<div className="flex gap-4 text-white">
							<button
								className=" hover:scale-125 hover:text-lightBlue"
								onClick={() => {
									setIsCopied(false);
									setLoading(false);
								}}>
								나가기
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
//정중앙에 띄우려면 상태관리 필요함
export default BigModal;
