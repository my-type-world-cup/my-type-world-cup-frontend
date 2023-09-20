import type { IngameModalData, Round } from "@/type/Types";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import GameMenubar from "./GameMenubar";
import PasswordInput from "./PasswordInput";

type Props = {
  isModal: [boolean, Round];
  setIsModal: Dispatch<SetStateAction<[boolean, Round]>>;
  data: IngameModalData;
  password: string | null;
  setPassword: Dispatch<SetStateAction<string | null>>;
  setError: Dispatch<SetStateAction<boolean>>;
  handleClick: (password: string | null, num: number) => Promise<void>;
  init: Round;
  error: boolean;
};

export default function GameRoundSection({
  isModal,
  setIsModal,
  data,
  password,
  setPassword,
  setError,
  handleClick,
  init,
  error
}: Props) {
  return (
    <>
      <p className="mt-2 sm:mt-8 text-sm break-all w-10/12">
        라운드를 선택해주세요
      </p>
      <GameMenubar isModal={isModal} setIsModal={setIsModal} init={init} />
      <p className="mt-2 text-sm break-all w-10/12 font-medium">
        총 {data.candidatesCount}명의 후보 중 {isModal[1]}명과 대결합니다
      </p>

      {!data.visibility && (
        <>
          <PasswordInput
            data={data}
            setPassword={setPassword}
            setError={setError}
            password={password}
            onEnterPress={(password) => handleClick(password, isModal[1])}
          />
          {error ? (
            <div className="ml-2 flex gap-1 w-10/12 text-error text-sm mt-1">
              <Image src="/icon/error.svg" alt="error" width={15} height={15} />
              비밀번호가 틀렸습니다.
            </div>
          ) : (
            <div className="w-10/12 text-sm mt-1 ">
              4자리의 숫자를 입력해주세요
            </div>
          )}
        </>
      )}

      <button
        onClick={() => handleClick(password, isModal[1])}
        type="button"
        className="bg-main px-4 mt-8 sm:mt-4 mb-4 h-10 text-white flex items-center space-x-2 rounded-lg hover:scale-110  cursor-pointer"
      >
        <Image src="/icon/start.svg" alt="start" width={17} height={20} />
        <p className="text-lg">시작하기</p>
      </button>
    </>
  );
}
