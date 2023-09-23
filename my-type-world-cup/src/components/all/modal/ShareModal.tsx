import { BACK_URL } from "@/lib/config";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
type ShareModalProps = {
  message: string;
  modalVisible: boolean; // 'isCopied'를 'modalVisible'로 이름 변경
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

const ShareModal = ({
  message,
  modalVisible,
  setModalVisible
}: ShareModalProps) => {
  const handleOAuth = () => {
    window.location.href = `${BACK_URL}/oauth2/authorization/google`;
  };

  const modalClass = modalVisible
    ? "absolute top-0 left-0  w-full h-full flex justify-center items-center pointer-events-auto"
    : "absolute top-0 left-0  w-full h-full flex justify-center items-center pointer-events-none";
  return (
    <div className={modalClass}>
      {/* 백그라운드 */}
      <div
        className="fixed w-screen left-0 top-0 h-screen  bg-black opacity-50 z-50"
        style={{
          opacity: modalVisible ? 0.5 : 0,
          transition: "opacity 0.3s ease-out"
        }}
        onClick={() => setModalVisible(false)}
      />
      <div
        className="fixed top-[35%] bg-main rounded-xl z-50 flex justify-center items-center flex-col"
        style={{
          opacity: modalVisible ? 1 : 0,
          transition: "opacity 0.3s ease-out"
        }}
      >
        {/* 로그인 이슈일 시 oauth로 안내함 */}
        <p className="p-4 text-white">{message}</p>
        {message === "로그인을 해주세요" && (
          <div
            className="flex justify-center items-center cursor-pointer text-white mb-2"
            onClick={() => handleOAuth()}
          >
            <Image
              src="/icon/google.svg"
              alt="Mypage"
              className=" mr-2"
              width={30}
              height={30}
            />
            구글 로그인
          </div>
        )}
      </div>
    </div>
  );
};
//정중앙에 띄우려면 상태관리 필요함
export default ShareModal;
