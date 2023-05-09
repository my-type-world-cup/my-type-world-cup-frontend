import Comment from "../game/Comment";
import CommentList from "../game/CommentList";
import GameButtons from "../main/GameButtons";

type Props = {
  id: number;
};

export default function GameSet({ id }: Props) {
  return (
    <>
      <GameButtons isreload={true} id={id} />
      <Comment />
      <CommentList />
    </>
  );
}
