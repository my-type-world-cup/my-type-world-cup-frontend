//search bar component for the app

import { useHandleSearchState } from "@/lib/hooks/useHandleSearchState";
import Image from "next/image";
import { useState } from "react";
interface Props {
	setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ setSearch }: Props) => {
	const [searchText, setSearchText] = useState("");

const handleSearch = useHandleSearchState({searchText, setSearch})

	return (
		<div className="flex items-center justify-center">
			<form
				className="bg-white w-72 h-10 relative flex items-center justify-center"
				onSubmit={handleSearch}>
				<button type="submit" className="absolute right-4 pb-2">
					<Image
						src="/icon/search.svg"
						alt="Search button"
						width={25}
						height={25}
					/>
				</button>

				<input
					type="text"
					placeholder="당신의 이상형을 찾아주세요"
					className="border-b-2 border-b-gray text-gray pb-2 pl-3 text-xl w-[280px] h-10 "
					onChange={(e) => setSearchText(e.target.value)}
				/>
			</form>
		</div>
	);
};

export default SearchBar;
