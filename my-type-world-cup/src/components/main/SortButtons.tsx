import type { SortValue } from "@/lib/hooks/useWorldcups";
interface Sort_buttons {
	name: string;
	value: SortValue;
}

interface Props {
	setSort: React.Dispatch<React.SetStateAction<SortValue>>;
	sort: SortValue;
}

const SortButtons = ({ setSort, sort }: Props) => {
	const sortButtons: Sort_buttons[] = [
		{ name: "인기순", value: "playCount" },
		{ name: "최신순", value: "createdAt" },

		{ name: "댓글순", value: "commentCount" }
	];

	const sortHandler = (value: SortValue) => {
		setSort(value);
	};

	return (
		<div className="mt-12 mx-auto">
			<div className="flex  text-xl">
				{sortButtons.map((button: Sort_buttons) => (
					<button
						key={button.value}
						onClick={() => sortHandler(button.value)}
						value={button.value}
						className={
							button.value === sort
								? "bg-main text-white w-20 h-10 px-2"
								: "bg-lightBlue text-gray w-20 h-10 px-2"
						}
						style={{ transition: "all 0.3s" }}>
						{button.name}
					</button>
				))}
			</div>
		</div>
	);
};

export default SortButtons;
