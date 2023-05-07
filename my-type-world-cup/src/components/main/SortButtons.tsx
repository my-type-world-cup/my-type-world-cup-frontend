import type { Value } from "@/pages";
interface Sort_buttons {
  name: string;
  value: string;
}

interface Props {
  setSort: React.Dispatch<React.SetStateAction<Value>>;
  sort: Value;
}

const SortButtons = ({ setSort, sort }: Props) => {
  const sortButtons: Sort_buttons[] = [
    { name: "인기순", value: "playCount" },
    { name: "최신순", value: "createdAt" },

    { name: "댓글순", value: "commentCount" },
  ];

  const sortHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setSort(e.currentTarget.value as Value); //메모

    //함수로 구현
    // const sortType = e.currentTarget.value
    // const sortedData = await getAllCup(sortType)
    // console.log(sortedData)
  };

  return (
    <div className="flex  text-xl">
      {sortButtons.map((button: Sort_buttons) => (
        <button
          key={button.value}
          onClick={(e) => sortHandler(e)}
          value={button.value}
          className={
            button.value === sort
              ? "bg-main text-white w-20 h-10 px-2"
              : "bg-lightBlue text-gray w-20 h-10 px-2"
          }
          style={{ transition: "all 0.3s" }}
        >
          {button.name}
        </button>
      ))}
    </div>
  );
};

export default SortButtons;
