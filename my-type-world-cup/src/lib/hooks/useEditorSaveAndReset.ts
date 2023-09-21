import { save_worldcup } from "@/api/user";
import type {
  Editor_step,
  Post_req,
  Post_res,
  Save_worldcupType
} from "@/type/Types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type SaveAndResetProps = {
  setWorldcup: Dispatch<SetStateAction<Post_res | null>>;
  setIsNumber: Dispatch<React.SetStateAction<Editor_step>>;
  accessToken: string | null;
  worldcup: Post_res | null;
  setIsValid: Dispatch<SetStateAction<boolean>>;
  setIsPublic: Dispatch<SetStateAction<boolean>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string | null>>;
  title: string;
  description: string;
  isPublic: boolean;
  password: string | null;
};

const PASSWORD_LENGTH = 4;

const useEditorSaveAndReset = ({
  setWorldcup,
  setIsNumber,
  accessToken,
  worldcup,
  setIsValid,
  setIsPublic,
  setTitle,
  setDescription,
  setPassword,
  title,
  description,
  isPublic,
  password
}: SaveAndResetProps) => {
  // 초기화 함수
  const resetStates = () => {
    setTitle("");
    setDescription("");
    setPassword(null);
  };

  // 저장 및 초기화
  const resetAndNavigateToNextStep = (res: Post_res): void => {
    setWorldcup(res); // 저장
    resetStates(); // 초기화
    setIsNumber("2"); // 다음 스텝으로 이동
  };

  // 다시 만들기
  const handleReset = (): void => {
    resetStates(); // 초기화
    setWorldcup(null);
  };

  // 저장하기
  const handleSave = async () => {
    if (!isPublic && password === null) {
      setIsValid(false);
      return;
    }

    const post_body: Post_req = {
      title,
      description,
      password: password || null
    };

    const type: Save_worldcupType = worldcup === null ? "new" : "update";
    const res = await save_worldcup(
      type,
      accessToken!,
      post_body,
      worldcup?.id
    );

    if (res !== null) {
      resetAndNavigateToNextStep(res);
    }
  };

  const handlePublicChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.value === "public");
  };

  //password 바꾸는 함수
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputPassword = event.target.value;
    const isValidPassword = inputPassword.length === PASSWORD_LENGTH;

    setIsValid(isValidPassword); // 유효성 검사 후 상태 업데이트
    setPassword(inputPassword); //true일떄만 사용
  };

  return {
    handleSave,
    handleReset,
    handlePublicChange,
    handlePasswordChange
  };
};

export default useEditorSaveAndReset;
