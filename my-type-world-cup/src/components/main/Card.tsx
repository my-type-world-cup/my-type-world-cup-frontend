import type { MainWorldcup } from "@/type/Types";
import Image from "next/image";
import { useState } from "react";
import GameButtons from "../all/button/GameButtons";
import MyworldcupButtons from "./MyworldcupButtons";
const Card = ({
  worldcup,
  mine = false,
  handlerDelete = () => {},
  handlerEditorWorldCup = () => {}
}: {
  handlerDelete?: (id: number) => void;
  worldcup: MainWorldcup;
  mine?: boolean;
  handlerEditorWorldCup?: (id: number) => void;
}) => {
  const [imageOn, setImageOn] = useState<boolean[]>([true, true]);
  const id = worldcup.id;
  const BlueMascotImage = "/icon/blueMascot.svg";
  const hasCandidates = worldcup.candidateSimpleResponseDtos.length === 2;

  return (
    <article className="border-main mt-4 mx-4 px-2 border-[1px] pb-4">
      <div className="flex justify-evenly mt-6">
        {hasCandidates ? (
          worldcup.candidateSimpleResponseDtos.map((candidate, index) => (
            <div key={index} className="w-[175px] overflow-hidden">
              <Image
                src={imageOn[index] ? candidate.image : BlueMascotImage}
                alt={`이상형 월드컵 ${index + 1}위 후보`}
                width={175}
                height={175}
                priority
                onError={() => {
                  const newImageOn = [...imageOn];
                  newImageOn[index] = false;
                  setImageOn(newImageOn);
                }}
              />
              <h4 className="text-center font-medium">{candidate.name}</h4>
            </div>
          ))
        ) : (
          <div className="w-auto overflow-hidden">
            <div className="w-[175px] h-[175px] overflow-hidden flex items-center">
              <Image
                src={BlueMascotImage}
                alt="No candidates"
                width={175}
                height={175}
                priority
              />
            </div>
            <h4 className="text-center font-medium">후보를 등록해주세요</h4>
          </div>
        )}
      </div>
      <h2 className="flex flex-col items-center mt-3 text-xl font-semibold">
        {worldcup.title}
      </h2>
      <p className="mx-4 overflow-hidden break-all whitespace-pre-line">
        {worldcup.description.length > 100
          ? worldcup.description.slice(0, 100) + "..."
          : worldcup.description}
      </p>
      {hasCandidates && <GameButtons id={id} />}
      {mine && (
        <MyworldcupButtons
          id={id}
          worldcupTitle={worldcup.title}
          hasCandidates={hasCandidates}
          handlerEditorWorldCup={handlerEditorWorldCup}
          handlerDelete={handlerDelete}
          candidateImage={
            hasCandidates
              ? worldcup.candidateSimpleResponseDtos[1].image
              : BlueMascotImage
          }
        />
      )}
    </article>
  );
};

export default Card;
