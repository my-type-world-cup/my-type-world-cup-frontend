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
import { CandidateCard } from "./CandidateCard";

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

const SHORT_DIMENSION = 280;
const TALL_DIMENSION = 330;
const SHORT_ICON = 40;
const TALL_ICON = 60;
const TIMEOUT_ANIMATION = 2200;

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
  const resultDataRef = useRef<Result_data[]>([]);
  const [count, setCount] = useState<number>(1);
  const isButtonDisabledRef = useRef<boolean>(false);
  const [loadHighQuality, setLoadHighQuality] = useState<boolean[]>([
    false,
    false
  ]);
  const imageLoadedFlagsRef = useRef<boolean[]>([false, false]);
  const [imageDimensions, setImageDimensions] = useState<number>(
    window.innerHeight <= 640 ? SHORT_DIMENSION : TALL_DIMENSION
  );
  const [iconDimensions, setIconDimensions] = useState<number>(
    window.innerHeight <= 640 ? SHORT_ICON : TALL_ICON
  );
  // useRef를 사용해서 라운드가 끝났는지를 저장
  const uploadCompletedRef = useRef<boolean>(false);
  const imageClickNumRef = useRef<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const isShort = window.innerHeight <= 640;
      setImageDimensions(isShort ? SHORT_DIMENSION : TALL_DIMENSION);
      setIconDimensions(isShort ? SHORT_ICON : TALL_ICON);
    };
    // 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트 될 때 이벤트 리스너를 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleImageLoad = (index: number) => {
    imageLoadedFlagsRef.current[index] = true;
  };

  const checkAllImagesLoaded = () => {
    return (
      imageClickNumRef.current > 2 ||
      imageLoadedFlagsRef.current.every((status) => {
        return status;
      })
    );
  };

  const updateWinnerAndResult = (winner: Contestant, loser: Contestant) => {
    winnerRef.current = [...winnerRef.current, winner];
    resultDataRef.current = [
      ...resultDataRef.current,
      {
        id: loser.id,
        matchUpGameCount: count,
        winCount: count - 1
      }
    ];
  };

  const handleClick = async (num: number) => {
    // 사진 로딩이 느릴 상황을 고려한 로직 (같은 사진을 사용하는 경우도 고려함)
    //유저가 pause되는 상황을 피하기 위함
    imageClickNumRef.current += 1;
    if (isButtonDisabledRef.current || !checkAllImagesLoaded()) return;

    setAnimationON(false); // animation 시작
    isButtonDisabledRef.current = true; // 버튼 비활성화
    setPickCandidateNum(num);

    const winner = twoPeople[num];
    const loser = twoPeople[num === 0 ? 1 : 0];
    //패자는 무조건 n경기당 n-1승을함
    //최종 승자는 마지막에 n경기당 n승임
    updateWinnerAndResult(winner, loser);

    if (matchRef.current.length === 0 && winnerRef.current.length === 1) {
      // endRef.current = true;
      resultDataRef.current = [
        ...resultDataRef.current,
        {
          id: winnerRef.current[0].id,
          matchUpGameCount: count,
          winCount: count
        }
      ];

      await Rank_result_fetch(resultDataRef.current);

      setStartON(false);
      setAnimationON(true);
      return;
    } else if (matchRef.current.length === 0) {
      //다음 라운드로 넘어가기

      setCount((prev) => prev + 1);
      setIsModal((prev) => [prev[0], (prev[1] / 2) as Round]);
      matchRef.current = winnerRef.current;
      winnerRef.current = [];
      uploadCompletedRef.current = true; // 이미지 업로드 완료
    }

    setTimeout(() => {
      // Reset 로직
      setAnimationON(true);
      setStartON(true);
      imageClickNumRef.current = 0;
      randomContestant(); //다시뽑기
      isButtonDisabledRef.current = false; // 버튼 활성화
      // 이미지 업로드 이후 캐싱으로 사용되기 때문에 더이상 쓰지 않음
      // (onLoadingComplet이 작동하지 않음)
      if (!uploadCompletedRef.current) {
        setLoadHighQuality([false, false]);

        imageLoadedFlagsRef.current = [false, false];
      }
    }, TIMEOUT_ANIMATION);
  };

  if (!startON) {
    return <></>;
  }

  return (
    <div className="relative">
      <h2 className="text-white text-xl text-center h-4 mt-2">
        {title} {isModal[1] === 2 ? `결승` : `${isModal[1]}강`}
      </h2>
      <CandidateCard
        pickNum={0}
        person={twoPeople[0]}
        animationON={animationON}
        pickCandidateNum={pickCandidateNum}
        handleImageLoad={handleImageLoad}
        loadHighQuality={loadHighQuality}
        setLoadHighQuality={setLoadHighQuality}
        imageLoadedFlag={imageLoadedFlagsRef.current[0]}
        imageDimensions={imageDimensions}
        handleClick={handleClick}
      />

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
      <CandidateCard
        pickNum={1}
        person={twoPeople[1]}
        animationON={animationON}
        pickCandidateNum={pickCandidateNum}
        handleImageLoad={handleImageLoad}
        loadHighQuality={loadHighQuality}
        setLoadHighQuality={setLoadHighQuality}
        imageLoadedFlag={imageLoadedFlagsRef.current[1]}
        imageDimensions={imageDimensions}
        handleClick={handleClick}
      />
    </div>
  );
}
//먼저 2명을 고른다
//둘중 1명을 뽑으면 저장하고 , 새로 뽑는다.
//만약에 이제 후보가 없으면, 새로 뽑을 수가 없다.
//왜냐하면 업데이트 되기전에 새로 뽑아야한다.

//눌렀을 대 업데이트가 되지 않음,

//같은 이미지를 사용할 경우, 버그가 생김
