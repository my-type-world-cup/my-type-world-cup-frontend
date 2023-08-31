
import { FormEvent, MouseEvent } from 'react';

type HandleSearchProps = {
  searchText: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

type HandleSearchReturnType = (
  e: FormEvent<HTMLFormElement> | MouseEvent<HTMLImageElement>
) => void;


//tag에 달기 위해 커스텀 훅으로 변경
export const useHandleSearchState = ({ searchText, setSearch }: HandleSearchProps): HandleSearchReturnType => {
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
//   e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLImageElement>,
//   setSearch: React.Dispatch<React.SetStateAction<string>>,
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