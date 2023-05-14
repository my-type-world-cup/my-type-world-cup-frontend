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
  console.log(accessToken);
  useLayoutEffect(() => {
    setAccessToken(getAccessTokenFromLocalStorage());
  }, []);
  console.log("하이");
  return (
    <>
      <GameButtons isreload={true} id={id} />
      <Comment winner={winner} />
      {accessToken === "실패" ? (
        <CommentList id={id} />
      ) : (
        <CommentList accessToken={accessToken} id={id} />
      )}
    </>
  );
}
