import Image from "next/image";
import React, { useEffect, useRef } from "react";

interface ImageListProps {
  data: string[] | null;
  setSize: (size: ((prevSize: number) => number) | number) => void;
}

const SearchImages: React.FC<ImageListProps> = ({ data, setSize }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current!;
      if (scrollLeft + clientWidth >= scrollWidth) {
        setSize((el) => el + 1);
      }
    };
    const container = containerRef.current!;
    container.addEventListener("scroll", handleScroll);

    return () => {
      return container.removeEventListener("scroll", handleScroll);
    };
  }, [setSize]);
  return (
    <div
      className={
        data && data.length > 0
          ? "overflow-scroll bg-white px-2 py-1"
          : " bg-white border border-gray rounded px-2 py-1"
      }
      ref={containerRef}
    >
      <div className="flex w-fit bg-white">
        {data && data.length > 0 ? (
          data.map((imageUrl, index) => (
            <div key={index} className="w-32 h-60 flex items-center mr-2">
              <Image
                src={imageUrl}
                alt={`Image ${index}`}
                width={200}
                height={200}
                className="cursor-pointer"
              />
            </div>
          ))
        ) : (
          <div className="bg-white">검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default SearchImages;
