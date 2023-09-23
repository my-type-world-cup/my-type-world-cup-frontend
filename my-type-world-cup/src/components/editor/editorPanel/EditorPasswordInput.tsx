// PasswordInput.tsx
import { ChangeEvent } from "react";

interface PasswordInputProps {
  password: string | null;
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
  isPublic: boolean;
}

const EditorPasswordInput = ({
  password,
  onChangePassword,
  isValid,
  isPublic
}: PasswordInputProps) => (
  <div className="flex justify-center flex-col pt-4">
    <label htmlFor="password">비밀번호</label>
    <input
      type="password"
      className="border-[1px] border-main text-gray mt-2 w-auto p-1 pl-4"
      maxLength={4}
      disabled={isPublic}
      placeholder="비밀번호 4자리를 입력해주세요"
      value={password ? password : ""}
      onChange={onChangePassword}
    />
    {!isValid && (
      <p className="text-error text-sm mt-1">4자리 숫자를 입력해주세요.</p>
    )}
  </div>
);

export default EditorPasswordInput;
