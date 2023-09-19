import { patchMember } from "@/api/user";
import ShareModal from "@/components/all/modal/ShareModal";
import { useMessageAndTimer } from "@/lib/hooks/useMessageAndTimer";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import type { User } from "../../lib/atom/atom";
import { accessTokenState, userState } from "../../lib/atom/atom";

const EMPTY_MESSAGE: string = "변경된 내용이 없습니다.";
const CHANGE_MESSAGE: string = "닉네임이 변경되었습니다";
const NICKNAME_VALIDATION_MESSAGE: string =
  "영문, 숫자, 한글만 사용할 수 있습니다";
const NICKNAME_REGEX: RegExp = /^$|^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{1,16}$/;

export default function Index() {
  const [user, setUser] = useRecoilState(userState);
  const [isSaved, setIsSaved] = useState<User>({
    nickname: "",
    email: "",
    id: 0,
    providerType: ""
  });
  const accessToken = useRecoilValue(accessTokenState);
  const { modalVisible, setModalVisible, message, setMessageAndTimer } =
    useMessageAndTimer();
  const router = useRouter();

  //비로그인 시 내보냄
  useEffect(() => {
    if (user === null) {
      router.push("/");
    } else {
      setIsSaved(user);
    }
  }, [user, router]);

  // 닉네임 상태 관리 함수
  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const input: string = e.target.value.trim();

    if (input.match(NICKNAME_REGEX)) {
      setIsSaved((prevUser) => ({ ...prevUser, nickname: input }));
    } else {
      setMessageAndTimer(NICKNAME_VALIDATION_MESSAGE, 1000);
    }
  };

  //변경 내역 저장 함수
  const saveHandler = async (): Promise<void> => {
    const trimmedNickname = isSaved.nickname.trim();

    if (trimmedNickname && trimmedNickname !== user?.nickname) {
      try {
        await patchMember(accessToken as string, isSaved.nickname);
        setUser((prevUser: User | null) =>
          prevUser ? { ...prevUser, nickname: isSaved.nickname } : null
        );
        setMessageAndTimer(CHANGE_MESSAGE, 2000);
      } catch (error) {
        console.error("Failed to update member:", error);
      }
    } else {
      setMessageAndTimer(EMPTY_MESSAGE, 2000);
    }
  };

  return (
    <>
      <main className="h-auto shadow-lg -mt-16">
        {/* 배너 */}
        <div className="flex justify-center items-center flex-col mt-24 pb-[25px]">
          <Image
            src="/icon/blueDolphin2.svg"
            alt="one"
            width={150}
            height={250}
          />
          <h3 className="text-xl mt-4">Dolpick를 이용해주셔서 감사합니다</h3>
        </div>

        {/* 닉네임 */}
        <div className="mt-20 mx-8 text-lg flex flex-col">
          <label htmlFor="name">닉네임 😊</label>
          <input
            type="name"
            className="border-b-[1px] border-main text-gray mt-4"
            value={isSaved.nickname}
            onChange={(e) => handleNicknameChange(e)}
          />
          <br />

          {/* 이메일 */}
          <label htmlFor="email">이메일 📬</label>
          <input
            type="email"
            className="border-b-[1px] border-main text-gray mt-4 cursor-default"
            value={isSaved.email}
            readOnly
          />

          {/* 회원탈퇴 */}
          <div className="flex justify-end mt-8 mb-12  text-main mr-4 font-light">
            <button type="submit">회원탈퇴</button>
          </div>

          {/* 저장하기 버튼 */}
          <button
            type="submit"
            className="rounded-3xl bg-main h-12 text-white sm:mt-12 mx-8 mb-20 hover:bg-inputHover"
            onClick={() => saveHandler()}
          >
            저장하기
          </button>
          <div className="sm:h-[190px]"></div>
        </div>
      </main>

      <ShareModal
        message={message}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}
