import { fetchContestants } from "@/api/user";
import type { Contestant, IngameModalData, Round } from "@/type/Types";
import Image from "next/image";
import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import GameRoundSection from "./GameRoundSection";

type Props = {
  isModal: [boolean, Round];
  setIsModal: Dispatch<SetStateAction<[boolean, Round]>>;
  randomContestant: () => void;
  data: IngameModalData;
  init: Round;
  matchRef: MutableRefObject<Contestant[]>;
};

export default function InGameModal({
  isModal,
  setIsModal,
  randomContestant,
  matchRef,
  data,
  init
}: Props) {
  const [error, setError] = useState<boolean>(false); // 비밀번호가 틀렸을 때 에러 처리
  const [password, setPassword] = useState<string | null>(null);

  const handleClick = async (password: string | null, teamCount: number) => {
    const success = await fetchContestants(
      password,
      teamCount,
      data.id,
      matchRef
    );

    if (success) {
      randomContestant();
      setIsModal((el) => [false, el[1]]);
    } else {
      setError(true);
    }
  };

  return (
    <div className="absolute top-2/4 rounded-3xl left-1/2 z-20 flex flex-col justify-center items-center transform -translate-x-1/2 -translate-y-1/2 bg-white h-4/6 sm:h-3/6 w-3/4">
      <Image
        src="/icon/trophy.svg"
        alt="mascot"
        className="mt-4 sm:mt-4"
        width={80}
        height={80}
      />
      <h2 className="text-main mt-2 text-xl break-all mx-6">{data?.title}</h2>
      <p className="mt-2 text-sm break-all w-10/12 h-auto min-h-8 mb-4">
        {data?.description}
      </p>
      {/* 라운드 설정 */}
      {data.candidatesCount >= 4 ? (
        <GameRoundSection
          isModal={isModal}
          setIsModal={setIsModal}
          data={data}
          password={password}
          setPassword={setPassword}
          setError={setError}
          handleClick={handleClick}
          init={init}
          error={error}
        />
      ) : (
        <div className="mx-4">
          현재 인원이
          <span className="text-error">{data.candidatesCount}명</span>
          이어서 게임을 시작할 수 없습니다 후보를 등록해주세요
        </div>
      )}
    </div>
  );
}
