type Props = {
  onandoff: boolean;
};

export default function SaveList({ onandoff }: Props) {
  return (
    <div
      style={{
        maxHeight: !onandoff ? "0px" : "500px",
        overflow: "hidden",
        transition: "all 1s ease-in-out",
      }}
    >
      <section
        className={
          false
            ? "overflow-scroll bg-white px-2 py-1"
            : " bg-white border border-hr rounded px-2 py-1 mb-4 h-36 text-gray"
        }
      >
        <div className="flex w-fit bg-white">
          {false ? (
            <div
            //   key={index}
            //   className="w-32 h-60 flex items-center mr-2"
            //   onClick={() => uploadHandler(imageUrl)}
            >
              {/* <Image
                src={imageUrl}
                alt={`Image ${index}`}
                width={200}
                height={200}
                className="cursor-pointer"
                onError={handleImageError}
              /> */}
            </div>
          ) : (
            <div className="bg-white">사진을 저장해주세요.</div>
          )}
        </div>
      </section>
    </div>
  );
}
