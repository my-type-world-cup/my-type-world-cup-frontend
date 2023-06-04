import Image from "next/image";
import { useState } from "react";
import loadingGif from "../../../public/icon/loading.gif";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      {!isLoading && (
        <Image
          src={loadingGif}
          alt={"loading"}
          width={350}
          height={400}
          className="absolute"
        />
      )}

      <Image
        src={imageUrl}
        className="max-w-full max-h-full mx-8 z-10"
        alt="Zoomed Image"
        width={350}
        onLoadingComplete={() => setIsLoading(true)}
        height={400}
      />
    </div>
  );
};
export default ZoomedImage;
