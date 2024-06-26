import { Dispatch, FormEvent, MouseEvent, SetStateAction } from "react";

type HandleSearchProps = {
  searchText: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

type HandleSearchReturnType = (
  e: FormEvent<HTMLFormElement> | MouseEvent<HTMLImageElement>
) => void;

//tag에 달기 위해 커스텀 훅으로 변경
export const useHandleSearchState = ({
  searchText,
  setSearch
}: HandleSearchProps): HandleSearchReturnType => {
  const handleSearch = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLImageElement>
  ) => {
    e.preventDefault();
    const trimmedSearchTerm = searchText.trim();
    setSearch(trimmedSearchTerm ? "&keyword=" + trimmedSearchTerm : "");
  };

  return handleSearch;
};

// const handleSearch = (
//   e: FormEvent<HTMLFormElement> | MouseEvent<HTMLImageElement>,
//   setSearch: Dispatch<SetStateAction<string>>,
//   searchText: string
// ) => {
//   e.preventDefault();
//   const trimmedSearchTerm = searchText.trim();

//   if (trimmedSearchTerm) {
//     setSearch("&keyword=" + trimmedSearchTerm);
//   } else {
//     setSearch("");
//   }
// };
