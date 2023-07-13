import { patchMember } from "@/api/user";
import ShareModal from "@/components/all/ShareModal";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import type { User } from "../../lib/atom/atom";
import { accessTokenState, userState } from "../../lib/atom/atom";
type Props = {};

export default function Index({}: Props) {
  const [user, setUser] = useRecoilState(userState);
  const [isSaved, setIsSaved] = useState<User>({
    nickname: "",
    email: "",
    id: 0,
    providerType: "",
  });
  const [message, setMessage] = useState("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const accessToken = useRecoilValue(accessTokenState);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/");
    }

    if (user?.nickname) {
      setIsSaved(user);
    }
  }, [user, router]);

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim();
    if (input.match(/^$|^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{1,16}$/)) {
      setIsSaved((prevUser) => ({
        ...prevUser,
        nickname: input,
      }));
    } else {
      setMessage("영문, 숫자, 한글만 사용할 수 있습니다");
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  };
  const saveHandler = () => {
    console.log(
      isSaved.nickname.trim() === "",
      isSaved.nickname.trim() === user?.nickname,
      isSaved.nickname.trim(),
      user?.nickname,
      isCopied
    );
    if (
      isSaved.nickname.trim() === "" ||
      isSaved.nickname.trim() === user?.nickname
    ) {
      setMessage("변경된 내용이 없습니다.");
      setIsCopied(true);
      console.log("3");
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } else {
      patchMember(accessToken as string, isSaved.nickname);
      setUser((prevUser: User | null) => {
        if (prevUser === null) {
          return null;
        }

        return {
          ...prevUser,
          nickname: isSaved.nickname,
        };
      });
      setMessage("닉네임이 변경되었습니다");
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <>
      <main className="h-auto shadow-lg -mt-16">
        <div className="flex justify-center items-center flex-col mt-24 pb-[25px]">
          <Image
            src="/icon/blueDolphin2.svg"
            alt="one"
            width={150}
            height={250}
          />
          <h3 className="text-xl mt-4">Dolpick를 이용해주셔서 감사합니다</h3>
        </div>

        <div className="mt-20 mx-8 text-lg flex flex-col">
          <label htmlFor="name">닉네임 😊</label>
          <input
            type="name"
            className="border-b-[1px] border-main text-gray mt-4"
            value={isSaved.nickname}
            onChange={(e) => handleNicknameChange(e)}
          />
          <br />

          <label htmlFor="email">이메일 📬</label>
          <input
            type="email"
            className="border-b-[1px] border-main text-gray mt-4"
            value={isSaved.email}
            readOnly
          />

          <div className="flex justify-end mt-8 mb-12  text-main mr-4 font-light">
            <button type="submit">회원탈퇴</button>
          </div>

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
        isCopied={isCopied}
        setIsCopied={setIsCopied}
      />
    </>
  );
}
