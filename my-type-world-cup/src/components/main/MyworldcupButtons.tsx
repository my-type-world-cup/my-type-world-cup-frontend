import { useState } from "react";
import EventModal from "../all/EventModal";
import GameButton from "./GameButton";
type myworldcupButtonsProps = {
	id: number;
	worldcupTitle: string;
	hasCandidates: boolean;
	handlerEditorWorldCup: (id: number) => void;
	handlerDelete: (id: number) => void;
	candidateImage?: string;
};
const MyworldcupButtons = ({
	id,
	worldcupTitle,
	hasCandidates,
	handlerEditorWorldCup,
	handlerDelete,
	candidateImage = "/icon/blueMascot.svg"
}: myworldcupButtonsProps) => {
	const [isCopied, setIsCopied] = useState(false);

	return (
		<div>
			<div className="flex flex-col justify-center items-center">
				<div className="my-4 text-white flex justify-evenly">
					<GameButton
						icon="/icon/white_person.svg"
						alt="Add Candidate"
						label="후보 추가"
						onClick={() => handlerEditorWorldCup(id)}
					/>
					<GameButton
						icon="/icon/white_delete.svg"
						alt="Delete"
						label="삭제하기"
						onClick={() => setIsCopied(true)}
					/>
				</div>
			</div>
			<EventModal
				isCopied={isCopied}
				setIsCopied={setIsCopied}
				message={`${worldcupTitle}를 삭제하시겠습니까?`}
				img={hasCandidates ? candidateImage : "/icon/blueMascot.svg"}
				handleDelete={() => handlerDelete(id)}
			/>
		</div>
	);
};

export default MyworldcupButtons;
