import Image from "next/image";
import loadingGif from "../../../public/icon/loading.gif";
const BigModal = ({
  message,
  isCopied,
  setIsCopied,
  img,
  uploadHandler,
  loading,
}: {
  setIsCopied: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  isCopied: boolean;
  img: string;
  uploadHandler: (image: string) => void;
  loading: boolean;
}) => {
  return (
    <div
      className={
        isCopied
          ? "fixed top-0 left-0  w-full h-full z-50 flex justify-center items-center pointer-events-auto"
          : "fixed top-0 left-0  w-full h-full z-50 flex justify-center items-center pointer-events-none"
      }
    >
      <div
        className="fixed w-full h-full bg-black opacity-50"
        style={{
          opacity: isCopied ? 0.5 : 0,
          transition: "opacity 0.3s ease-out",
        }}
        onClick={() => {
          if (!loading) setIsCopied(false);
        }}
      />

      <div
        className="fixed left-50% lg:right-[36%] bg-main rounded-xl p-4 pt-6 z-50 flex justify-center items-center flex-col"
        style={{
          opacity: isCopied ? 1 : 0,
          transition: "opacity 0.3s ease-out",
        }}
      >
        {loading ? (
          <>
            <Image
              src={loadingGif}
              alt={"loading"}
              width={200}
              height={200}
              className="cursor-pointer"
            />
          </>
        ) : (
          <Image
            src={img}
            alt={`choiceImage`}
            width={200}
            height={200}
            className="cursor-pointer"
          />
        )}
        {!loading ? (
          <>
            <p className="p-4 text-white">{message}</p>
            <div className="flex gap-4 text-white">
              <button
                className=" hover:scale-125 hover:text-lightBlue"
                onClick={() => uploadHandler(img)}
              >
                예
              </button>
              <button
                className=" hover:scale-125 hover:text-lightBlue"
                onClick={() => setIsCopied(false)}
              >
                아니오
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="p-4 text-white">
              고화질 사진은 시간이 걸릴 수도 있습니다.
            </p>
            <div className="flex gap-4 text-white">
              <button
                className=" hover:scale-125 hover:text-lightBlue"
                onClick={() => setIsCopied(false)}
              >
                취소하기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
//정중앙에 띄우려면 상태관리 필요함
export default BigModal;
