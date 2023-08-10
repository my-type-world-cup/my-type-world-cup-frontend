import { BACK_URL } from "@/lib/config";
import Image from "next/image";
const ShareModal = ({
	message,
	isCopied,
	setIsCopied
}: {
	setIsCopied: React.Dispatch<React.SetStateAction<boolean>>;
	message: string;
	isCopied: boolean;
}) => {
	const OauthHandler = () => {
		window.location.href = `${BACK_URL}/oauth2/authorization/google`;
	};
	return (
		<div
			className={
				isCopied
					? "absolute top-0 left-0  w-full h-full flex justify-center items-center pointer-events-auto"
					: "absolute top-0 left-0  w-full h-full flex justify-center items-center pointer-events-none"
			}>
			<div
				className='fixed w-screen left-0 top-0 h-screen  bg-black opacity-50 z-50'
				style={{
					opacity: isCopied ? 0.5 : 0,
					transition: "opacity 0.3s ease-out"
				}}
				onClick={() => setIsCopied(false)}
			/>
			<div
				className='fixed top-[35%] bg-main rounded-xl z-50 flex justify-center items-center flex-col'
				style={{
					opacity: isCopied ? 1 : 0,
					transition: "opacity 0.3s ease-out"
				}}>
				<p className='p-4 text-white'>{message}</p>
				{message === "로그인을 해주세요" && (
					<div
						className='flex justify-center items-center cursor-pointer text-white mb-2'
						onClick={() => OauthHandler()}>
						<Image
							src='/icon/google.svg'
							alt='Mypage'
							className=' mr-2'
							width={30}
							height={30}
						/>
						구글 로그인
					</div>
				)}
			</div>
		</div>
	);
};
//정중앙에 띄우려면 상태관리 필요함
export default ShareModal;
