import Image from "next/image";
import loadingGif from "../../../public/icon/loading.gif";

type BigModalProps = {
	setIsMake?: React.Dispatch<React.SetStateAction<boolean>>;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	message: string;
	modalVisible: boolean;
	img: string;
	uploadHandler: (image: string) => void;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const BigModal = ({
	message,
	modalVisible,
	setModalVisible,
	setIsMake,
	img,
	uploadHandler,
	loading,
	setLoading
}: BigModalProps) => {
	const handleModalClose = () => {
		if (!loading) setModalVisible(false);
	};

	return (
		<div
			className={`absolute left-[0px] top-0 w-full h-full z-50 flex justify-center items-center ${
				modalVisible ? "pointer-events-auto" : "pointer-events-none"
			}`}>
			{/* 백그라운드 */}
			<div
				className="absolute w-full bg-black opacity-50"
				style={{
					opacity: modalVisible ? 0.5 : 0,
					transition: "opacity 0.3s ease-out",
					height: "calc(100% + 40px)"
				}}
				onClick={handleModalClose}
			/>

			<div
				className="fixed top-[25%] bg-main rounded-xl p-4 pt-6 z-50 flex justify-center items-center flex-col"
				style={{
					opacity: modalVisible ? 1 : 0,
					transition: "opacity 0.3s ease-out"
				}}>
				{/* 로딩 이미지와 선택된 이미지 */}
				<Image
					src={loading ? loadingGif : img || loadingGif}
					alt={loading ? "loading" : "choiceImage"}
					width={200}
					height={200}
					className={loading ? "" : "cursor-pointer"}
				/>
				{!loading ? (
					<>
						{/* 업로드 여부 확인 버튼*/}
						<p className="p-4 text-white">{message}</p>
						<div className="flex gap-4 text-white">
							<button
								className=" hover:scale-125 hover:text-lightBlue"
								onClick={() => uploadHandler(img)}>
								예
							</button>
							<button
								className=" hover:scale-125 hover:text-lightBlue"
								onClick={() => setModalVisible(false)}>
								아니오
							</button>
						</div>
					</>
				) : (
					<>
						{/* 고화질 사진 업로드 안내 메시지 */}
						<p className="p-4 mt-8 text-white">
							고화질 사진은 1~2분 소요됩니다
						</p>
						<div className="flex gap-4 text-white">
							<button
								className=" hover:scale-125 hover:text-lightBlue"
								onClick={() => {
									setModalVisible(false);
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
