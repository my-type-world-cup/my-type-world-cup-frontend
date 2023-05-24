import type { Save_data } from "@/type/Types";
import Image from "next/image";
type Props = {
  onandoff: boolean;
  saveList: Save_data[];
};

export default function SaveList({ onandoff, saveList }: Props) {
  return (
    <div
      style={{
        maxHeight: !onandoff ? "0px" : "500px",
        overflow: "hidden",
        transition: "all 1s ease-in-out",
      }}
    >
      <section
        className={
          saveList.length > 0
            ? "overflow-scroll bg-white h-48 border border-hr p-2 "
            : " bg-white border border-hr rounded px-2 py-1 mb-4 h-36 text-gray"
        }
      >
        <div className="flex w-fit bg-white">
          {saveList ? (
            saveList.map((item: Save_data, index) => (
              <div
                key={index}
                className="w-32 h-36 flex flex-col items-center mr-2"
              >
                <Image
                  src={item.thumb}
                  alt={`Image ${index}`}
                  width={200}
                  height={200}
                />
                <span className="text-gray">{item.name}</span>
              </div>
            ))
          ) : (
            <div className="bg-white h-44 text-gray ">
              저장된 이미지가 없습니다.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
