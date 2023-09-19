import { Rank_result_fetch } from "@/api/user";
import type { Contestant, Result_data, Round } from "@/type/Types";
import Image from "next/image";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from "react";
type Props = {
  isModal: [boolean, Round];
  twoPeople: Contestant[];
  randomContestant: () => void;
  setIsModal: Dispatch<SetStateAction<[boolean, Round]>>;
  winnerRef: MutableRefObject<Contestant[]>;
  matchRef: MutableRefObject<Contestant[]>;

  title: string;
  animationON: boolean;
  setAnimationON: Dispatch<SetStateAction<boolean>>;
  pickCandidateNum: number;
  setPickCandidateNum: Dispatch<SetStateAction<number>>;
  startON: boolean;
  setStartON: Dispatch<SetStateAction<boolean>>;
};

export default function InGame({
  isModal,
  twoPeople,
  randomContestant,
  setIsModal,
  winnerRef,
  matchRef,

  animationON,
  setAnimationON,
  setStartON,
  startON,
  setPickCandidateNum,
  pickCandidateNum,
  title
}: Props) {
  const isResult = useRef<Result_data[]>([]);
  const [count, setCount] = useState<number>(1);
  const isButtonDisabledRef = useRef(false);
  const [loadHighQuality, setLoadHighQuality] = useState<boolean[]>([
    false,
    false
  ]);
  const isImagesLoadedRef = useRef<boolean[]>([false, false]);
  const [imageDimensions, setImageDimensions] = useState(
    window.innerHeight <= 640 ? 280 : 330
  );
  const [iconDimensions, setIconDimensions] = useState(
    window.innerHeight <= 640 ? 40 : 60
  );
  // useRef를 사용해서 라운드가 끝났는지를 저장
  const isImageUploadEndRef = useRef(false);

  const handleResize = () => {
    setImageDimensions(window.innerHeight <= 640 ? 280 : 330);
    setIconDimensions(window.innerHeight <= 640 ? 40 : 60);
  };

  useEffect(() => {
    // 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트 될 때 이벤트 리스너를 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleImageLoad = (index: number) => {
    isImagesLoadedRef.current[index] = true;
  };

  const checkAllImagesLoaded = () => {
    console.log(isImagesLoadedRef, "이거");
    return isImagesLoadedRef.current.every((status) => {
      return status;
    });
  };

  const handleClick = async (num: number) => {
    console.log(num, isButtonDisabledRef.current, !checkAllImagesLoaded());
    if (isButtonDisabledRef.current || !checkAllImagesLoaded()) {
      console.log("왜?");
      return;
    }
    console.log("헐?");
    setAnimationON(false);
    isButtonDisabledRef.current = true; // 버튼 비활성화
    setPickCandidateNum(num);
    console.log(num, isButtonDisabledRef.current, !checkAllImagesLoaded());
    // 패자만 모와서 저장?
    //패자는 무조건 n경기당 n-1승을함
    //최종 승자는 마지막에 n경기당 n승임
    if (num === 0) {
      winnerRef.current = [...winnerRef.current, twoPeople[0]];
      isResult.current = [
        ...isResult.current,
        {
          id: twoPeople[1].id,
          matchUpGameCount: count,
          winCount: count - 1
        }
      ];
    } else if (num === 1) {
      winnerRef.current = [...winnerRef.current, twoPeople[1]];
      isResult.current = [
        ...isResult.current,
        {
          id: twoPeople[0].id,
          matchUpGameCount: count,
          winCount: count - 1
        }
      ];
    }

    if (matchRef.current.length === 0 && winnerRef.current.length === 1) {
      // endRef.current = true;
      isResult.current = isResult.current.concat([
        {
          id: winnerRef.current[0].id,
          matchUpGameCount: count,
          winCount: count
        }
      ]);

      await Rank_result_fetch(isResult.current);

      setStartON(false);
      setAnimationON(true);
      return;
    } else if (matchRef.current.length === 0) {
      //다음 라운드로 넘어가기

      setCount((prev) => prev + 1);
      setIsModal((prev) => [prev[0], (prev[1] / 2) as Round]);
      matchRef.current = winnerRef.current;
      winnerRef.current = [];

      isImageUploadEndRef.current = true; // 이미지 업로드 완료
    }

    setTimeout(() => {
      setAnimationON(true);
      setStartON(true);
      randomContestant(); //다시뽑기
      isButtonDisabledRef.current = false; // 버튼 활성화
      // 이미지 업로드 이후 캐싱으로 사용되기 때문에 더이상 쓰지 않음
      // (onLoadingComplet이 작동하지 않음)
      if (!isImageUploadEndRef.current) {
        setLoadHighQuality([false, false]);

        isImagesLoadedRef.current = [false, false];
      }
    }, 2200);
  };

  if (!startON) {
    return <></>;
  }
  console.log(isButtonDisabledRef.current, "정지");
  return (
    <div className="relative">
      <h2 className="text-white text-xl text-center h-4 mt-2">
        {title} {isModal[1] === 2 ? `결승` : `${isModal[1]}강`}
      </h2>
      <div
        className="flex justify-center pt-2 mt-4"
        onClick={() => handleClick(0)}
        style={{
          transform: animationON
            ? "translateY(0%)"
            : pickCandidateNum === 0
            ? "translateY(35%)"
            : " translateX(150%)",
          transition:
            !animationON && pickCandidateNum === 0
              ? "all 1s ease-in-out"
              : "all 0s",
          opacity: !animationON && pickCandidateNum === 1 ? "0" : "1"
        }}
      >
        <Image
          src={twoPeople[0].image}
          alt="고화질 이상형 1"
          width={imageDimensions}
          height={imageDimensions}
          priority
          className={`cursor-pointer sm:hover:scale-105 duration-300 ${
            loadHighQuality[0] ? "" : "hidden"
          }`}
          onLoadingComplete={() => {
            setLoadHighQuality((value) => [true, value[1]]);
          }}
        />
        <Image
          src={twoPeople[0].thumb}
          alt="저화질 이상형 1"
          width={imageDimensions}
          height={imageDimensions}
          priority
          className={`cursor-pointer sm:hover:scale-105 duration-300 ${
            loadHighQuality[0] ? "hidden" : ""
          }`}
          onLoadingComplete={() => handleImageLoad(0)}
        />
        <h3
          className="absolute text-white bottom-10 left-1/2 transform -translate-x-1/2 "
          style={{
            textShadow:
              "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black"
          }}
        >
          {twoPeople[0].name}
        </h3>
      </div>
      <div
        className="absolute top-[53%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        style={{
          transition: "transform 1s ease-in-out",
          visibility: !animationON ? "hidden" : "visible"
        }}
      >
        <Image
          src="/icon/vs.svg"
          alt="Picture of the author"
          width={iconDimensions}
          height={iconDimensions}
          className="mx-4"
        />
      </div>
      <div
        className="flex justify-center sm:mt-40"
        onClick={() => handleClick(1)}
        style={{
          transform: animationON
            ? "translateY(0%)"
            : pickCandidateNum === 1
            ? "translateY(-60%)"
            : "translateX(200%)",
          transition:
            !animationON && pickCandidateNum === 1
              ? "transform 1s ease-in-out"
              : "",
          visibility:
            !animationON && pickCandidateNum === 0 ? "hidden" : "visible"
        }}
      >
        <Image
          src={twoPeople[1].image}
          alt="고화질 이상형 2"
          priority
          width={imageDimensions}
          height={imageDimensions}
          onClick={() => handleClick(1)}
          className={`cursor-pointer sm:hover:scale-105 duration-300 ${
            loadHighQuality[1] ? "" : "hidden"
          }`}
          onLoadingComplete={() => {
            setLoadHighQuality((value) => [value[0], true]);
          }}
        />
        <Image
          src={twoPeople[1].thumb}
          alt="저화질 이상형 2"
          priority
          width={imageDimensions}
          height={imageDimensions}
          onClick={() => handleClick(1)}
          onLoadingComplete={() => handleImageLoad(1)}
          className={`cursor-pointer sm:hover:scale-105 duration-300 ${
            loadHighQuality[1] ? "hidden" : ""
          }`}
        />
        <h3
          className="absolute text-white bottom-10 left-1/2 transform -translate-x-1/2 "
          style={{
            textShadow:
              "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black"
          }}
        >
          {twoPeople[1].name}
        </h3>
      </div>
    </div>
  );
}
//먼저 2명을 고른다
//둘중 1명을 뽑으면 저장하고 , 새로 뽑는다.
//만약에 이제 후보가 없으면, 새로 뽑을 수가 없다.
//왜냐하면 업데이트 되기전에 새로 뽑아야한다.

//눌렀을 대 업데이트가 되지 않음,
