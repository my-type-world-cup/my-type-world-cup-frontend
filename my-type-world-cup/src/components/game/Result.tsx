import Image from "next/image";
import { MutableRefObject } from "react";
import type { Contestant, rank_Data } from "../../type/Types";
import GameSet from "../all/GameSet";
import Table from "../rank/Table";
type Props = {
	winnerRef: MutableRefObject<Contestant[]>;
	id: number;
	title: string;
};

export default function Result({ winnerRef, id, title }: Props) {
	const rankData: rank_Data = {
		worldCupId: id,
		password: null
	};
	return (
		<>
			<div className="h-auto mt-28 ">
				<div className=" relative flex flex-col justify-center pt-4 items-center overflow-hidden mx-12 h-[300px] ">
					<Image
						src={winnerRef.current[0].thumb}
						alt="one"
						width={500}
						height={330}
						className="duration-300"
					/>
				</div>
				<h3 className="mt-3 mb-1 mx-8 text-center text-main text-2xl font-bold">
					{winnerRef.current[0].name}
				</h3>

				<h3 className="text-center text-xl -mb-14  ">{title} 우승자</h3>
				<Table worldcupId={id} />
				<GameSet id={id} winner={winnerRef.current[0]} />
			</div>
		</>
	);
}
