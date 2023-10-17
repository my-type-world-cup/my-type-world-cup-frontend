// CandidateCard라는 컴포넌트로 분리
import type { Contestant } from "@/type/Types";
import Image from "next/image";
import type { CSSProperties, Dispatch, SetStateAction } from "react";
import loadingGif from "../../../../public/icon/loading.gif";

interface CandidateCardProps {
  pickNum: number;
  person: Contestant;
  animationON: boolean;
  pickCandidateNum: number;
  handleImageLoad: (pickNum: number) => void;
  loadHighQuality: boolean[];
  setLoadHighQuality: Dispatch<SetStateAction<boolean[]>>;
  imageLoadedFlag: boolean;
  imageDimensions: number;
  handleClick: (num: number) => Promise<void>;

}

export const CandidateCard = ({
  pickNum,
  person,
  animationON,
  pickCandidateNum,
  handleImageLoad,
  loadHighQuality,
  setLoadHighQuality,
  imageLoadedFlag,
  imageDimensions,
  handleClick,

}: CandidateCardProps) => {
  const first = pickNum === 0;
  const marginTop = first ? "mt-6" : "sm:mt-40";
  const choice = pickCandidateNum === pickNum;

  const getTransform = () => {
    if (animationON) return "translateY(0%)";
    if (choice) return first ? "translateY(45%)" : "translateY(-65%)";
    return "translateX(200%)";
  };

  const getTransition = () =>
    !animationON && choice ? "all 1s ease-in-out" : "all 0s";

  const getVisibility = () => (!animationON && !choice ? "hidden" : "visible");

  const candidateStyle: CSSProperties = {
    transform: getTransform(),
    transition: getTransition(),
    visibility: getVisibility()
  };

  const isLoading =!imageLoadedFlag&&!loadHighQuality[pickNum]

  return (
    <div
      className={`flex justify-center ${marginTop}`}
      onClick={() => handleClick(pickNum)}
      style={candidateStyle}
    >
     {isLoading&&<Image
						src={loadingGif}
						alt={`cover`}
						width={imageDimensions}
						height={imageDimensions}
					/>
     }
      {/*adaptive streaming 방식으로 저화질 -> 고화질 업로드*/}
      <Image
        src={person.image}
        alt={`고화질 이상형 ${pickNum + 1}`}
        width={imageDimensions}
        height={imageDimensions}
        priority
        className={`cursor-pointer sm:hover:scale-105 duration-300 ${
          loadHighQuality[pickNum] ? "" : "hidden"
        }`}
        onLoadingComplete={() => {
          setLoadHighQuality((prev) => {
            const newQuality = [...prev];
            newQuality[pickNum] = true;
            return newQuality;
          });
          if (!imageLoadedFlag) {
            imageLoadedFlag = true;
          }
        }}
      />
      <Image
        src={person.thumb}
        alt={`저화질 이상형 ${pickNum + 1}`}
        width={imageDimensions}
        height={imageDimensions}
        priority
        className={`cursor-pointer sm:hover:scale-105 duration-300 ${
          loadHighQuality[pickNum] ? "hidden" : ""
        }`}
        onLoadingComplete={() => handleImageLoad(pickNum)}
      />

      <h3
        className="absolute text-white bottom-10 left-1/2 transform -translate-x-1/2"
        style={{
          textShadow:
            "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black"
        }}
      >
        {person.name}
      </h3>
    </div>
  );
};
