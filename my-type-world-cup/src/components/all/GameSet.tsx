import { useLayoutEffect, useState } from "react";
import { getAccessTokenFromLocalStorage } from "../../lib/Helper";
import type { Contestant } from "../../type/Types";
import Comment from "../game/Comment";
import CommentList from "../game/CommentList";
import GameButtons from "../main/GameButtons";
type Props = {
  id?: number;
  winner?: Contestant;
};

export default function GameSet({ id, winner }: Props) {
  const [accessToken, setAccessToken] = useState<string>("");
  const [rendering, setRendering] = useState<boolean>(false);
  // console.log(accessToken);
  useLayoutEffect(() => {
    setAccessToken(getAccessTokenFromLocalStorage());
  }, []);

  return (
    <>
      <GameButtons isreload={true} id={id} />
      <Comment
        winner={winner}
        setRendering={setRendering}
        rendering={rendering}
      />
      {accessToken === "실패" ? (
        <CommentList id={id} rendering={rendering} />
      ) : (
        <CommentList accessToken={accessToken} id={id} rendering={rendering} />
      )}
    </>
  );
}
