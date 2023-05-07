const ShareModal = ({
  message,
  isCopied,
}: {
  message: string;
  isCopied: boolean;
}) => {
  return (
    <div className="fixed top-0 left-0 lg:left-[7.3%] w-full h-full z-50 flex justify-center items-center pointer-events-none">
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
        style={{
          opacity: isCopied ? 0.5 : 0,
          transition: "opacity 0.3s ease-out",
        }}
      />
      <div
        className="bg-main rounded-xl z-50"
        style={{
          opacity: isCopied ? 1 : 0,
          transition: "opacity 0.3s ease-out",
        }}
      >
        <p className="p-4">{message}</p>
      </div>
    </div>
  );
};
//정중앙에 띄우려면 상태관리 필요함
export default ShareModal;
