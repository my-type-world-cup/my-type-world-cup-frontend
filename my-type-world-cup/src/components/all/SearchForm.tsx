import Image from 'next/image';
import { ChangeEvent, FormEvent, MouseEvent } from 'react';

// Props 타입 정의
interface SearchFormProps {
	handleSearch: (
		e: FormEvent<HTMLFormElement> | MouseEvent<HTMLImageElement>
	) => void;
	searchText: string;
	setSearchText: (text: string) => void;
}

// FC (Function Component) 타입을 사용하여 컴포넌트 정의
const SearchForm = ({
	handleSearch,
	searchText,
	setSearchText
}: SearchFormProps) => (
	<form className="mb-4 mr-4 relative" onSubmit={handleSearch}>
		<input
			type="text"
			className="w-full rounded border-gray border-[1px]  p-1"
			placeholder="Search"
			value={searchText}
			// ChangeEvent 타입을 지정하여 이벤트 객체의 타입을 명시
			onChange={(e: ChangeEvent<HTMLInputElement>) =>
				setSearchText(e.target.value)
			}
		/>
		<Image
			src="/icon/search.svg"
			alt="Search"
			className="absolute right-2 top-2 cursor-pointer"
			width={18}
			height={18}
			onClick={handleSearch}
		/>
	</form>
);

export default SearchForm