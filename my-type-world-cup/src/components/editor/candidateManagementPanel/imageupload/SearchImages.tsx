import { convertToBase64, uploadImageToServer } from "@/lib/editor/base64";
import type { Imgbb_result } from "@/type/Types";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useRef,
  useState
} from "react";
import BigModal from "../../../all/modal/BigModal";
interface ImageListProps {
  data: string[] | null;
  setImgSrc: Dispatch<SetStateAction<string>>;
  setSize: (size: ((prevSize: number) => number) | number) => void;
  keyword: string;
}

const SearchImages = ({
  data,
  setSize,
  setImgSrc,
  keyword
}: ImageListProps) => {
  console.log(data);
  const [modal, setModal] = useState<boolean>(false);
  const [img, setImg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
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
  }, []);

  useEffect(() => {
    setSize(1);
    scrollToStart();
  }, [keyword]);

  //이미지 깨지는 경우에는 삭제
  const handleImageError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = event.target as HTMLImageElement;
    const parentElement = target.parentElement;
    if (parentElement) {
      parentElement.style.display = "none"; // 부모 요소인 DIV를 숨김 처리
    }
  };

  //재검색시 스크롤 초기화
  const scrollToStart = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 10;
    }
  };

  //클릭할 시 이미지 확인 모달
  const modalHandler = (image: string) => {
    setModal(!modal);
    setImg(image);
  };

  //업로드 함수
  const uploadHandler = async (image: string) => {
    try {
      setLoading(true); // 로딩 상태 시작

      const response: Imgbb_result = await uploadImageToServer(image);
      const base64 = await convertToBase64(response.data.image.url); // await 사용

      setImgSrc(base64);
      setModal(false); // 모달 닫기
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // 로딩 상태 끝
    }
  };

  const hasData = data && data.length > 0;

  return (
    <>
      <div
        style={{
          maxHeight: hasData ? "500px" : "80px",
          overflow: "hidden",
          transition: "all 1s ease-in-out"
        }}
      >
        <div
          className={
            hasData
              ? "overflow-scroll  bg-white px-2 py-1 h-full"
              : " bg-white border border-hr rounded px-2 py-1"
          }
          ref={containerRef}
        >
          <div className="flex w-fit bg-white">
            {hasData ? (
              data.map((imageUrl, index) => (
                <div
                  key={index}
                  className="w-32 h-44 flex items-center mr-2"
                  onClick={() => modalHandler(imageUrl)}
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
              <div className="bg-white h-fit text-gray ">
                {loading ? "검색중입니다" : "검색 결과가 없습니다."}
              </div>
            )}
          </div>
        </div>
        <BigModal
          message="이미지를 선택하시겠습니까?"
          modalVisible={modal}
          setModalVisible={setModal}
          setLoading={setLoading}
          img={img}
          uploadHandler={uploadHandler}
          loading={loading}
        />
      </div>
    </>
  );
};

export default SearchImages;
