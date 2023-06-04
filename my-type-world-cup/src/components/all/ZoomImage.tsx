import Image from "next/image";
interface ZoomedImageProps {
  imageUrl: string;
  zoomed: boolean;
  setZoomed: React.Dispatch<React.SetStateAction<boolean>>;
}

const ZoomedImage: React.FC<ZoomedImageProps> = ({
  imageUrl,
  setZoomed,
  zoomed,
}) => {
  const handleImageClick = () => {
    setZoomed(true);
  };

  const handleOverlayClick = () => {
    setZoomed(false);
  };

  return (
    <div
      className="bg-black bg-opacity-50 absolute left-[0px] top-0 w-full h-full z-50 flex justify-center items-center pointer-events-auto"
      onClick={handleOverlayClick}
    >
      <Image
        src={imageUrl}
        className="max-w-full max-h-full mx-8 "
        alt="Zoomed Image"
        width={350}
        height={400}
      />
    </div>
  );
};
export default ZoomedImage;
