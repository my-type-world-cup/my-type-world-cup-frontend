import { Dispatch, SetStateAction } from "react";

type PageSizeSelectorProps = {
	pageSize: number;
	setPageSize: Dispatch<SetStateAction<number>>;
};

const PAGE_SIZE_OPTIONS = [5, 10, 20, 30] as const;
type PageSizeOptionsType = typeof PAGE_SIZE_OPTIONS[number]; // 5 | 10 | 20 | 30



const PageSizeSelector = ({ pageSize, setPageSize }: PageSizeSelectorProps) => (
	<div className="mb-4">
		<select
			value={pageSize}
			onChange={(e) => setPageSize(parseInt(e.target.value))}
			className="ml-2 rounded border-gray-300 py-2 outline-none">
			{PAGE_SIZE_OPTIONS.map((option: PageSizeOptionsType) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
		<label className="font-bold mr-[1px]">개씩 보기</label>
	</div>
);

export default PageSizeSelector
