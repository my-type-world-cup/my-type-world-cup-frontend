import { Dispatch, SetStateAction } from "react";


type TableHeaderProps = {
	label: string;
	sortKey: string;
	sort: string;
	setSort: Dispatch<SetStateAction<string>>;
};

const TableHeader = ({ label, sortKey, sort, setSort }: TableHeaderProps) => {
	return (
		<th
			className={
				sort === sortKey ? "text-main border-b-4 border-main" : "cursor-pointer"
			}
			onClick={() => setSort(sortKey)}>
			{label}
		</th>
	);
};

export default TableHeader