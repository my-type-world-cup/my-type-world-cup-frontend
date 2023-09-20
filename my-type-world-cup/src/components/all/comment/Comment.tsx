import { getTimeDiffString } from "@/lib/Helper";
import type { Comment_list_data } from "@/type/Types";

type CommentItemProps = {
  comment: Comment_list_data;
  handleCancleLike: (id: number) => void;
  handleLikeComment: (id: number) => void;
};

export const Comment = ({
  comment,
  handleCancleLike,
  handleLikeComment
}: CommentItemProps) => {
  // 클래스 이름을 동적으로 생성
  const likeClassName = comment.isLiked
    ? "text-sm font-bold hover:scale-105 text-main cursor-pointer"
    : "cursor-pointer text-gray text-sm hover:font-bold hover:scale-105 hover:text-main";

  return (
    <>
      <div className="flex justify-between mx-4 font-light">
        <h2 className="text-black text-sm">
          {comment.nickname === null ? "익명" : comment.nickname}
          <span className="ml-2 text-gray">
            {comment.candidateName && `(${comment.candidateName})  `}
            {getTimeDiffString(comment.createdAt)}
          </span>
        </h2>

        {/* 좋아요 클릭 이벤트 */}
        <span
          onClick={() =>
            comment.isLiked
              ? handleCancleLike(comment.id)
              : handleLikeComment(comment.id)
          }
          className={likeClassName}
        >
          좋아요 {comment.likesCount}
        </span>
      </div>
      <p className="mx-4 font-thin text-sm">{comment.content}</p>
      <hr className="border-hr my-2" />
    </>
  );
};
