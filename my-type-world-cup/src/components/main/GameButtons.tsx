import { FRONT_URL } from "@/lib/config";
import { useRouter } from "next/router";
import { useState } from "react";
import ShareModal from "../all/ShareModal";
import GameButton from "./GameButton";

type GameButtonsProps = {
	isReload?: boolean;
	id?: number;
};

const GameButtons = ({ isReload = false, id }: GameButtonsProps) => {
	const router = useRouter();
	const [isCopied, setIsCopied] = useState(false);

	const handleCopyLink = () => {
		navigator.clipboard.writeText(FRONT_URL + "/game/" + id);
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 1000);
	};

	return (
		<div className="flex items-center justify-center mx-auto mt-4 h-10 w-full text-sm sm:text-lg text-white font-medium">
			<GameButton
				icon="/icon/start.svg"
				alt="Start Game"
				label={isReload ? "다시하기" : "시작하기"}
				onClick={() => router.push(`/game/${id}`)}
			/>

			{isReload ? (
				<GameButton
					icon="/icon/whiteTrophy.svg"
					alt="Go to Home"
					label="홈화면"
					onClick={() => router.push("/")}
				/>
			) : (
				<GameButton
					icon="/icon/ranking.svg"
					alt="View Ranking"
					label="랭킹보기"
					onClick={() => router.push(`/rank/${id}`)}
				/>
			)}

			<GameButton
				icon="/icon/share.svg"
				alt="Share"
				label="공유"
				onClick={handleCopyLink}
			/>

			<ShareModal
				message="복사되었습니다"
				isCopied={isCopied}
				setIsCopied={setIsCopied}
			/>
		</div>
	);
};

export default GameButtons;
