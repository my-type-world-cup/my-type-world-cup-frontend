//dropdown component for the app

import { BACK_URL } from "@/lib/config";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
// import { useRecoilState } from "recoil";
// import { userState } from "@/recoil/userState";
type DropDownProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
};

const DropDown = ({ isOpen, setIsOpen }: DropDownProps) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  //   const [user, setUser] = useRecoilState(userState);

  const handleLogout = () => {
    router.push("/");
    setIsOpen(false);
    localStorage.removeItem("user");
  };

  const OauthHandler = () => {
    window.location.href = `${BACK_URL}/oauth2/authorization/google`;
  };

  return (
    <>
      <div
        className=" bg-main shadow-lg w-3/4 h-screen z-20 absolute top-0 right-0 transition-transform duration-300"
        style={{
          opacity: isOpen ? "1" : "0",
          position: "absolute",
          transition: "transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <ul className="text-white tracking-wide font-medium">
          <li
            className="flex items-center px-4 py-3 mt-24 cursor-pointer "
            onClick={() => setIsLogin(true)}
          >
            <Image
              src="/icon/login.svg"
              alt="Login"
              className="cursor-pointer"
              width={30}
              height={31}
              priority
            />
            <span className="text-gray-700 dark:text-gray-200 ml-3">
              로그인을 해주세요
            </span>
          </li>
          {/* <li
            className="flex items-center px-4 py-3 cursor-pointer"
            onClick={handleLogout}
          >
            <Image
              src="/icon/logout.svg"
              alt="Logout"
              className="cursor-pointer"
              width={30}
              height={36}
              priority
            />
            <span className="ml-3">로그아웃</span>
          </li> */}
          {/* <hr className="border-gray-200 border-1 mt-12" /> */}
          {/* <li className="flex items-center px-4 py-3 cursor-pointer">
            <Image
              src="/icon/person.svg"
              alt="Mypage"
              className="cursor-pointer"
              width={30}
              height={27}
              priority
            />
            <span className="ml-3">닉네임을 설정해주세요</span>
          </li> */}
          {!isLogin && (
            <>
              <li className="flex items-center px-4 py-3 cursor-pointer mt-16">
                <Image
                  src="/icon/whiteTrophy.svg"
                  alt="Mypage"
                  className="cursor-pointer"
                  width={30}
                  height={30}
                  priority
                />
                <span className="ml-3">이상형 월드컵</span>
              </li>
              <li className="flex items-center px-4 py-3 cursor-pointer">
                <Image
                  src="/icon/film.svg"
                  alt="Mypage"
                  className="cursor-pointer"
                  width={30}
                  height={37}
                  priority
                />
                <span className="ml-3">내가 만든 월드컵</span>
              </li>
              <li className="flex items-center px-4 py-3 cursor-pointer">
                <Image
                  src="/icon/folder.svg"
                  alt="Mypage"
                  className="cursor-pointer"
                  width={30}
                  height={26}
                  priority
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
                  priority
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
                  priority
                />
                <span className="ml-3">Guest 로그인</span>
              </li>
            </>
          )}
        </ul>
      </div>

      <div
        className="absolute top-0 left-0 w-full h-screen bg-black opacity-70 z-10"
        onClick={() => setIsOpen(false)}
        style={{
          opacity: isOpen ? "0.7" : "0",

          transform: isOpen ? "translate-x-0" : "translate-x-full",
          transition: "opacity 0.3s ease-in-out",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      />
    </>
  );
};

export default DropDown;
