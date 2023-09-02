import { fetcherToken } from "@/api/swr_fetch";
import { cancle_like_comment, likes_comment } from "@/api/user";
import { BACK_URL } from "@/lib/config";
import { useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";
import type {
	Comment_list,
	Comment_list_data,
	Comment_list_pageInfo
} from "../../type/Types";
import { Comment } from "./Comment";
import ShareModal from "./ShareModal";

type Props = {
	accessToken: string | null;
	id: number;
	rendering: boolean;
};

export default function CommentList({ accessToken, id, rendering }: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isCopied, setIsCopied] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	// SWR을 사용하여 무한 스크롤 데이터 가져오기
	const { data, mutate, setSize } = useSWRInfinite<Comment_list>(
		(index) =>
			`${BACK_URL}/comments?sort=createdAt&page=${
				index + 1
			}&size=10&direction=DESC&worldCupId=${id}`,
		(url: string) => fetcherToken(url, accessToken)
	);

	// accessToken이나 rendering 값이 바뀔 때 데이터 재요청
	useEffect(() => {
		mutate();
	}, [accessToken, mutate, rendering]);

	// 페이지 정보 추출
	const page: Comment_list_pageInfo =
		data && data[data.length - 1].pageInfo
			? data[data.length - 1].pageInfo
			: {
					totalElements: 0,
					totalPages: 0,
					first: true,
					last: true,
					size: 0,
					page: 0
			  };

	// 댓글 정보 추출
	const comments: Comment_list_data[] = data
		? data.map((v) => v.data).flat()
		: [];

	// 좋아요, 좋아요 취소 로직
	const handleCommentLikeStatus = async (
		id: number,
		actionFunc: typeof likes_comment | typeof cancle_like_comment,
		successMessage: string
	) => {
		try {
			const response = await actionFunc(id, accessToken); // 함수를 인자로 받음

			if (response.ok) {
				setMessage(successMessage); // 메시지 설정
				setIsCopied(true);

				mutate();
				setTimeout(() => setIsCopied(false), 1000);
			}
		} catch (error) {
			setMessage("로그인을 해주세요.");
			setIsCopied(true);
			mutate();
		}
	};

	// 좋아요 처리
	const handleLikeComment = (id: number) =>
		handleCommentLikeStatus(id, likes_comment, "추천하였습니다");

	// 좋아요 취소 처리
	const handleCancleLike = (id: number) =>
		handleCommentLikeStatus(id, cancle_like_comment, "취소하였습니다");

	return (
		<>
			<div
				className="font-thin text-gray bg-inputGray h-auto overflow-y-scroll"
				ref={containerRef}>
				{comments.map((comment: Comment_list_data) => (
					<Comment
						key={comment.id}
						comment={comment}
						handleCancleLike={handleCancleLike}
						handleLikeComment={handleLikeComment}
					/>
				))}

				{/* 더보기 버튼 */}
				<div className="flex justify-center my-4">
					<button
						onClick={() =>
							setSize((el) => {
								//최대값 계산 로직
								if (el + 1 > page.totalPages) {
									return el;
								} else {
									return el + 1;
								}
							})
						}
						className="bg-main hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						더보기&nbsp;{page.totalPages ? page.page : 0}/{page.totalPages}
					</button>
				</div>
			</div>

			{/* 댓글 좋아요 관련 모달 */}
			<ShareModal
				message={message}
				isCopied={isCopied}
				setIsCopied={setIsCopied}
			/>
		</>
	);
}
