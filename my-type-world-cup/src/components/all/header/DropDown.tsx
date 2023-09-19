import { BACK_URL } from "@/lib/config";

import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { accessTokenState, lastPath, userState } from "../../../lib/atom/atom";
import ShareModal from "../modal/ShareModal";
type DropDownProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
};

const DropDown = ({ isOpen, setIsOpen }: DropDownProps) => {
  const setLastPath = useSetRecoilState(lastPath);
  const resetAccessToken = useResetRecoilState(accessTokenState);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [isCheck, setIsCheck] = useState(true);

  useEffect(() => {
    if (user?.nickname) {
      setIsCheck(false);
    }
  }, [user]);

  const handlego = (word?: string) => {
    router.push(`/${word}`);
    setIsOpen(false);
  };
  const handlelogout = (word?: string) => {
    setUser(null);
    setIsCheck(true);
    setIsOpen(false);
    setLastPath(null);
    resetAccessToken();
    router.push(`/`);
  };

  const alram = (word: string) => {
    if (modalVisible) return;
    if (user?.nickname) {
      setIsOpen(false);
      router.push(`/${word}`);
    } else {
      setMessage("로그인을 해주세요");
      setModalVisible(true);
    }
  };

  const OauthHandler = () => {
    setLastPath(router.asPath);

    window.location.href = `${BACK_URL}/oauth2/authorization/google`;
  };

  return (
    <>
      <div
        className=" bg-main shadow-lg w-3/4 h-screen z-40 absolute top-0 right-0 transition-transform duration-300"
        style={{
          opacity: isOpen ? "1" : "0",
          position: "absolute",
          transition: "transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          pointerEvents: isOpen ? "auto" : "none"
        }}
      >
        <ul className="text-white tracking-wide font-medium">
          {isCheck ? (
            <li
              className="flex items-center px-4 py-3 mt-24 cursor-pointer mb-[120px]"
              onClick={() => setIsLogin(!isLogin)}
            >
              <Image
                src="/icon/login.svg"
                alt="Login"
                className="cursor-pointer"
                width={30}
                height={31}
              />
              <span className="ml-3">
                {isLogin ? "뒤로 가기" : "로그인을 해주세요"}
              </span>
            </li>
          ) : (
            <>
              <li
                className="flex items-center px-4 py-3 mt-24 cursor-pointer"
                onClick={() => handlego("mypage")}
              >
                <Image
                  src="/icon/person.svg"
                  alt="Mypage"
                  className="cursor-pointer"
                  width={30}
                  height={27}
                />
                <span className="ml-3">{user?.nickname}</span>
              </li>

              <li
                className="flex items-center px-4 py-3 cursor-pointer"
                onClick={() => handlelogout()}
              >
                <Image
                  src="/icon/logout.svg"
                  alt="Logout"
                  className="cursor-pointer"
                  width={30}
                  height={36}
                />
                <span className="ml-3">로그아웃</span>
              </li>
            </>
          )}
          {!isLogin && (
            <>
              <li
                className="flex items-center px-4 py-3 cursor-pointer mt-16"
                onClick={() => handlego("")}
              >
                <Image
                  src="/icon/whiteTrophy.svg"
                  alt="Mypage"
                  className="cursor-pointer"
                  width={30}
                  height={30}
                />
                <span className="ml-3">이상형 월드컵</span>
              </li>
              <li
                className="flex items-center px-4 py-3 cursor-pointer"
                onClick={() => alram("myworldcup")}
              >
                <Image
                  src="/icon/film.svg"
                  alt="Mypage"
                  className="cursor-pointer"
                  width={30}
                  height={37}
                />
                <span className="ml-3">나만의 월드컵</span>
              </li>
              <li
                className="flex items-center px-4 py-3 cursor-pointer"
                onClick={() => alram("editors")}
              >
                <Image
                  src="/icon/folder.svg"
                  alt="editor"
                  className="cursor-pointer"
                  width={30}
                  height={26}
                />
                <span className="ml-3">이상형 월드컵 만들기</span>
              </li>
            </>
          )}
          {isLogin && (
            <>
              <li
                className="flex items-center px-4 py-3 cursor-pointer mt-16"
                onClick={() => OauthHandler()}
              >
                <Image
                  src="/icon/google.svg"
                  alt="Mypage"
                  className="cursor-pointer"
                  width={30}
                  height={30}
                />
                <span className="ml-3">Google 로그인</span>
              </li>
              <li className="flex items-center px-4 py-3 cursor-pointer">
                <Image
                  src="/icon/guest.svg"
                  alt="Mypage"
                  className="cursor-pointer"
                  width={32}
                  height={34}
                />
                <span className="ml-3">추가 Oauth 준비중</span>
              </li>
            </>
          )}
        </ul>
      </div>

      <div
        className="absolute top-0 left-0 w-full h-screen bg-black opacity-70 z-30"
        onClick={() => setIsOpen(false)}
        style={{
          opacity: isOpen ? "0.7" : "0",

          transform: isOpen ? "translate-x-0" : "translate-x-full",
          transition: "opacity 0.3s ease-in-out",
          pointerEvents: isOpen ? "auto" : "none"
        }}
      />
      <ShareModal
        message={message}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default DropDown;
