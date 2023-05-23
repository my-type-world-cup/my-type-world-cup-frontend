import { convertToBase64, uploadImageToServer } from "@/lib/editor/base64";
import type { imgbb_result } from "@/type/Types";
import Image from "next/image";
import React, { SyntheticEvent, useEffect, useRef } from "react";
interface ImageListProps {
  onandoff: boolean;
  data: string[] | null;
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
  setSize: (size: ((prevSize: number) => number) | number) => void;
  keyword: string;
}

const SearchImages: React.FC<ImageListProps> = ({
  data,
  setSize,
  setImgSrc,
  keyword,
  onandoff,
}) => {
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
  useEffect(() => {
    setSize(1);
    scrollToStart();
  }, [keyword, setSize]);
  const handleImageError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = event.target as HTMLImageElement;
    const parentElement = target.parentElement;
    if (parentElement) {
      parentElement.style.display = "none"; // 부모 요소인 DIV를 숨김 처리
    }
  };
  const scrollToStart = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 10;
    }
  };

  const uploadHandler = async (image: string) => {
    try {
      // await fetch(image)
      //   .then((response) => response.blob())
      //   .then((blob) => {
      //     // Use the image blob as needed
      //     console.log(blob);
      //     // Further processing with the blob (e.g., display or save)
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching image:", error);
      //   });
      const response: imgbb_result = await uploadImageToServer(image);

      convertToBase64(response.data.image.url).then((base64) => {
        setImgSrc(base64);
        console.log("짠");
      });
    } catch (error) {
      // 에러 처리를 위한 로직 추가
      console.error(error);
    }
  };

  return (
    <div
      style={{
        maxHeight: !onandoff ? "0px" : "500px",
        overflow: "hidden",
        transition: "all 1s ease-in-out",
      }}
    >
      <div
        className={
          data && data.length > 0
            ? "overflow-scroll  bg-white px-2 py-1"
            : " bg-white border border-hr rounded px-2 py-1"
        }
        ref={containerRef}
      >
        <div className="flex w-fit bg-white">
          {data && data.length > 0 ? (
            data.map((imageUrl, index) => (
              <div
                key={index}
                className="w-32 h-44 flex items-center mr-2"
                onClick={() => uploadHandler(imageUrl)}
              >
                <Image
                  src={imageUrl}
                  alt={`Image ${index}`}
                  width={200}
                  height={200}
                  className="cursor-pointer"
                  onError={handleImageError}
                />
              </div>
            ))
          ) : (
            <div className="bg-white h-44 text-gray ">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchImages;