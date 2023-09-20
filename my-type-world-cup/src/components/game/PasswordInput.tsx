// PasswordInput.tsx
import type { IngameModalData } from "@/type/Types";
import { Dispatch, SetStateAction } from "react";

interface PasswordInputProps {
  data: IngameModalData;
  setPassword: Dispatch<SetStateAction<string | null>>;
  setError: Dispatch<SetStateAction<boolean>>;
  password: string | null;
  onEnterPress: (password: string | null) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  data,
  setPassword,
  setError,
  password,
  onEnterPress
}) => {
  return (
    <>
      <input
        className="mt-2 sm:mt-4 w-10/12 h-8 px-4 border-[1px] text-sm border-gray"
        type="password"
        disabled={data.visibility}
        maxLength={4} // 최대 4자리까지 입력 가능하도록 설정
        pattern="[0-9]*" // 숫자만 입력 가능하도록 설정
        placeholder={
          data.visibility ? "비밀번호는 없습니다" : "비밀번호를 입력해주세요"
        }
        onChange={(e) => {
          setPassword(e.target.value);
          setError(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnterPress(password);
          }
        }}
      />
    </>
  );
};

export default PasswordInput;
