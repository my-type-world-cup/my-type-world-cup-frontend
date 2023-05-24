import Image from "next/image";
type Props = {
  onandoff: boolean;
  saveList: string[];
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
            ? "overflow-scroll bg-white h-48"
            : " bg-white border border-hr rounded px-2 py-1 mb-4 h-36 text-gray"
        }
      >
        <div className="flex w-fit bg-white">
          {saveList ? (
            saveList.map((item, index) => (
              <div key={index} className="w-32 h-36 flex items-center mr-2">
                <Image
                  src={item}
                  alt={`Image ${index}`}
                  width={200}
                  height={200}
                  className="cursor-pointer"
                />
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
