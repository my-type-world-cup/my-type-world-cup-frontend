import { useState } from "react";

interface Sort_buttons {
  name: string;
  value: string;
}
const SortButtons = () => {
  const [isWord, setIsWord] = useState<string>("");
  const sortButtons: Sort_buttons[] = [
    { name: "최신순", value: "recent" },
    { name: "인기순", value: "popular" },
    { name: "좋아요순", value: "like" },
    { name: "댓글순", value: "comment" },
  ];
  console.log(isWord);
  const sortData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsWord(e.currentTarget.value);

    //함수로 구현
    // const sortType = e.currentTarget.value
    // const sortedData = await getAllCup(sortType)
    // console.log(sortedData)
  };

  return (
    <div className="flex  ">
      {sortButtons.map((button: Sort_buttons) => (
        <button
          key={button.value}
          onClick={(e) => sortData(e)}
          value={button.value}
          className={
            button.value === isWord
              ? "bg-main text-white w-20 h-7"
              : "bg-lightBlue text-gray w-20 h-7"
          }
          style={{ transition: "all 0.2s" }}
        >
          {button.name}
        </button>
      ))}
    </div>
  );
};

export default SortButtons;
