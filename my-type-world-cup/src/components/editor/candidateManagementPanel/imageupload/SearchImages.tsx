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

  const modalHandler = (image: string) => {
    setModal(!modal);
    setImg(image);
  };
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

