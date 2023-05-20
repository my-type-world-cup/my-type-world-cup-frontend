import Image from "next/image";
import React from "react";

interface ImageListProps {
  data: string[] | null;
}

const SearchImages: React.FC<ImageListProps> = ({ data }) => {
  return (
    <div className="overflow-x-scroll bg-white border-main border-2">
      <div className="flex w-fit bg-white">
        {data && data.length > 0 ? (
          data.map((imageUrl, index) => (
            <div key={index} className="w-52 h-80">
              <Image
                src={imageUrl}
                alt={`Image ${index}`}
                width={200}
                height={200}
                className="mr-1"
              />
            </div>
          ))
        ) : (
          <div>검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default SearchImages;
