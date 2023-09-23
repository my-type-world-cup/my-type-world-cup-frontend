import type { SortValue, Sort_buttons } from "@/type/Types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setSort: Dispatch<SetStateAction<SortValue>>;
  sort: SortValue;
  sortButtons: Sort_buttons[];
};

const SortButtons = ({ setSort, sort, sortButtons }: Props) => {
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
            style={{ transition: "all 0.3s" }}
          >
            {button.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortButtons;
