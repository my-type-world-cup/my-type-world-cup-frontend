import { useState } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../../lib/atom/atom";
import type { Contestant } from "../../type/Types";
import Comment from "../game/Comment";
import CommentList from "../game/CommentList";
import GameButtons from "../main/GameButtons";

type Props = {
	id: number;
	winner?: Contestant;
};

export default function GameSet({ id, winner }: Props) {
	const [rendering, setRendering] = useState<boolean>(false);
	const accessToken = useRecoilValue(accessTokenState);
	// console.log(accessToken);

	return (
		<>
			<GameButtons isReload={true} id={id} />
			<Comment
				winner={winner}
				setRendering={setRendering}
				rendering={rendering}
			/>
			{accessToken === null ? (
				<CommentList accessToken={accessToken} id={id} rendering={rendering} />
			) : (
				<CommentList accessToken={accessToken} id={id} rendering={rendering} />
			)}
		</>
	);
}
