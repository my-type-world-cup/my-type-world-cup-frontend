import type { Save_data } from "@/type/Types";
import Image from "next/image";
import { useState } from "react";
import SpanInput from "./SpanInput";
type Props = {
  onandoff: boolean;
  saveList: Save_data[];
  accessToken: string | null;
};

export default function SaveList({ onandoff, saveList, accessToken }: Props) {
  console.log(saveList, "saveList");
  const [isEditing, setIsEditing] = useState(false);
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
            ? "overflow-scroll bg-white h-80 border border-hr p-2 "
            : " bg-white border border-hr rounded px-2 py-1 mb-4 h-36 text-gray"
        }
      >
        <div className="flex flex-col w-full">
          {saveList ? (
            saveList.map((item: Save_data, index) => (
              <div key={index} className="flex items-center">
                <div className="w-32 h-36 flex items-center justify-center mr-2 ">
                  <Image
                    src={item.thumb}
                    alt={`Image ${index}`}
                    width={200}
                    height={200}
                    placeholder="blur"
                    blurDataURL={
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsunSpHgAGiwKf6utBLQAAAABJRU5ErkJggg=="
                    } //보류
                  />
                </div>
                <div className="w-full">
                  <SpanInput
                    name={item.name}
                    accessToken={accessToken}
                    item={item}
                  />
                </div>
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
