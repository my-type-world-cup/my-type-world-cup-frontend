//search bar component for the app

import Image from "next/image";
import { useState } from "react";

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ setSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(searchTerm);
  };

  return (
    <div className="flex items-center justify-center">
      <form
        className="flex items-center justify-center w-full h-full"
        onSubmit={handleSearch}
      >
        <div className="bg-white w-72  h-10 relative flex items-center justify-center">
          <Image
            src="/icon/search.svg"
            alt="Search"
            className="absolute left-2 pb-2"
            width={25}
            height={25}
            priority
          />
          <input
            type="text"
            placeholder="당신의 이상형을 찾아주세요"
            className="border-b-2 border-b-gray text-gray pb-2 pl-10 text-xl w-[280px] h-10 "
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
