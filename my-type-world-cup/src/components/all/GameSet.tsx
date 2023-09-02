import { useState } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../../lib/atom/atom";
import type { Contestant } from "../../type/Types";
import GameButtons from "../main/GameButtons";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

type Props = {
	id: number;
	winner?: Contestant;
};

export default function GameSet({ id, winner }: Props) {
	const [rendering, setRendering] = useState<boolean>(false);
	const accessToken = useRecoilValue(accessTokenState);

	return (
		<>
			<GameButtons isReload={true} id={id} />
			<CommentForm
				winner={winner}
				setRendering={setRendering}
				rendering={rendering}
			/>
			<CommentList accessToken={accessToken} id={id} rendering={rendering} />
		</>
	);
}
