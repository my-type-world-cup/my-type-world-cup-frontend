import { fetcherToken } from "@/api/swr_fetch";
import { getTimeDiffString } from "@/lib/Helper";
import { BACK_URL } from "@/lib/config";
import { useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";
import type {
	Comment_list,
	Comment_list_data,
	Comment_list_pageInfo
} from "../../type/Types";
import ShareModal from "../all/ShareModal";

type Props = {
	accessToken: string | null;
	id: number;
	rendering: boolean;
};
const PAGE_SIZE = 10;
export default function CommentList({ accessToken, id, rendering }: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isCopied, setIsCopied] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");
	const { data, mutate, size, setSize, isValidating, isLoading } =
		useSWRInfinite<Comment_list>(
			(index) =>
				`${BACK_URL}/comments?sort=createdAt&page=${
					index + 1
				}&size=10&direction=DESC&worldCupId=${id}`,
			(url: string) => fetcherToken(url, accessToken)
		);
	useEffect(() => {
		mutate();
	}, [accessToken, mutate, rendering]);

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

	const comments: Comment_list_data[] = data
		? data.map((v) => v.data).flat()
		: [];

	//예시는 모두다 배열임
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === "undefined"); //로딩중

	// 더이상 없을때 체크
	const isRefreshing = isValidating && data && data.length === size; // 요청중

	const handleLikeComment = async (id: number) => {
		const response = await fetch(`${BACK_URL}/comments/${id}/likes`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...(accessToken && { Authorization: `Bearer ${accessToken}` })
			},
			body: JSON.stringify({ commentId: id })
		});

		if (!response.ok) {
			setMessage("로그인을 해주세요");
			setIsCopied(true);

			mutate();
		}
		if (response.ok) {
			setMessage("추천하였습니다");
			setIsCopied(true);

			mutate();
			setTimeout(() => {
				setIsCopied(false);
			}, 1000);
		}
	};
	const handleDeleteComment = async (id: number) => {
		const response = await fetch(`${BACK_URL}/comments/${id}/likes`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				...(accessToken && { Authorization: `Bearer ${accessToken}` })
			}
		});
		if (response.ok) {
			mutate();
			setMessage("취소하였습니다");
			setIsCopied(true);

			setTimeout(() => {
				setIsCopied(false);
			}, 1000);
		}
	};

	return (
		<>
			<div
				className="font-thin text-gray bg-inputGray h-auto overflow-y-scroll"
				ref={containerRef}>
				{comments.map((comment: Comment_list_data) => (
					<div key={comment.id}>
						<div className="flex justify-between mx-4 font-light">
							<h2 className="text-black text-sm">
								{comment.nickname === null ? "익명" : comment.nickname}
								<span className="ml-2 text-gray">
									{comment.candidateName && (
										<>
											{"(" + comment.candidateName + ")"}
											&nbsp;&nbsp;
										</>
									)}
									{getTimeDiffString(comment.createdAt)}
								</span>
							</h2>

							{comment.isLiked ? (
								<>
									<span
										onClick={() => handleDeleteComment(comment.id)}
										className="text-sm font-bold hover:scale-105 text-main cursor-pointer">
										좋아요 {comment.likesCount}
									</span>
								</>
							) : (
								<>
									<span
										onClick={() => handleLikeComment(comment.id)}
										className="cursor-pointer text-gray text-sm hover:font-bold hover:scale-105 hover:text-main">
										좋아요 {comment.likesCount}
									</span>
								</>
							)}
						</div>
						<p className="mx-4 font-thin text-sm">{comment.content}</p>
						<hr className="border-hr my-2" />
					</div>
				))}
				<div className="flex justify-center my-4">
					<button
						onClick={() =>
							setSize((el) => {
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
			{
				<ShareModal
					message={message}
					isCopied={isCopied}
					setIsCopied={setIsCopied}
				/>
			}
		</>
	);
}
