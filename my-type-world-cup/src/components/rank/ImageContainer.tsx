import Image from "next/image";
import { useState } from "react";
type Props = {
  thumb: string;
  image: string;
  zoomedHandler: (image: string) => void;
};

export default function ImageContainer({ thumb, zoomedHandler, image }: Props) {
  const [imageOn, setImageOn] = useState<boolean>(true);
  const BlueMascotImage = "/icon/blueMascot.svg";
  return (
    <Image
      className="flex justify-center items-center cursor-pointer"
      src={imageOn && thumb ? thumb : BlueMascotImage}
      alt="start"
      width={60}
      height={60}
      onClick={() => zoomedHandler(image)}
      onError={() => {
        setImageOn(false);
      }}
    />
  );
}
