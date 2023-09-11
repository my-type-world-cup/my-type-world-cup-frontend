import type { MainWorldcup } from "@/type/Types";
import Image from "next/image";
import { useRouter } from "next/router";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";

type WorldcupListProps = {
	worldcups: MainWorldcup[] | null;
	mine?: boolean;
	handlerDelete?: (id: number) => void;
	handlerEditorWorldCup?: (id: number) => void;
	isLoading: boolean;
};

const WorldcupList = ({
	worldcups,
	mine = false,
	handlerDelete,
	handlerEditorWorldCup,
	isLoading
}: WorldcupListProps) => {
	const router = useRouter();
	const hasWorldcups = worldcups && worldcups.length > 0;

	if (isLoading) {
		return (
			<article className="w-full h-auto ">
				{Array.from({ length: 10 }, (_, i) => (
					<CardSkeleton key={i} />
				))}
			</article>
		);
	}

	return (
		<article className="w-full h-auto ">
			{hasWorldcups ? (
				worldcups.map((worldcup) => (
					<Card
						key={worldcup.id}
						worldcup={worldcup}
						mine={mine}
						handlerDelete={handlerDelete}
						handlerEditorWorldCup={handlerEditorWorldCup}
					/>
				))
			) : (
				<div className="flex justify-center items-center flex-col mt-24 pb-[25px]">
					<Image
						src="/icon/blueDolphin2.svg"
						alt="one"
						width={150}
						height={250}
					/>
					<h3 className="text-xl mt-8 text-center leading-loose tracking-wide">
						월드컵이 없습니다. <br />
						{mine ? (
							<>
								<button
									onClick={() => router.push("/editors")}
									className="bg-main p-2 text-white cursor-pointer rounded-lg">
									후보 추가
								</button>
								를 통해 업데이트해주세요
							</>
						) : (
							<span className="bg-main p-2 text-white rounded-lg">
								이상형 월드컵 만들기를 통해 업데이트해주세요
							</span>
						)}
					</h3>
				</div>
			)}
		</article>
	);
};

export default WorldcupList;
