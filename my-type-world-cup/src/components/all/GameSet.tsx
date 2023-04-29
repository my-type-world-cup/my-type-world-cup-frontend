import Comment from "../game/Comment";
import CommentList from "../game/CommentList";
import GameButtons from "../main/GameButtons";

export default function GameSet() {
  return (
    <>
      <GameButtons isreload={true} />
      <Comment />
      <CommentList />
    </>
  );
}
