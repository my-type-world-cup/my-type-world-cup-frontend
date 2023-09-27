// ImageCropper.tsx

import Image from "next/image";
import { Dispatch, RefObject, SetStateAction, SyntheticEvent } from "react";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop
} from "react-image-crop";

interface ImageCropperProps {
  crop: Crop | undefined;
  setCrop: Dispatch<SetStateAction<Crop | undefined>>;
  completedCrop: PixelCrop | undefined;
  setCompletedCrop: Dispatch<SetStateAction<PixelCrop | undefined>>;
  aspect: number | undefined;
  imgSrc: string;
  scale: number;
  rotate: number;
  imgRef: RefObject<HTMLImageElement>;
  previewCanvasRef: RefObject<HTMLCanvasElement>;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  //자르기 도구
  return centerCrop(
    //중앙에 배치함
    makeAspectCrop(
      {
        unit: "%",
        width: 50, //초기값 드래그 범위
        height: 50
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const ImageCropper = ({
  crop,
  setCrop,
  setCompletedCrop,
  aspect,
  imgSrc,
  scale,
  rotate,
  imgRef,
  previewCanvasRef,
  completedCrop
}: ImageCropperProps) => {
  function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  return (
    <>
      {/* 원본 이미지를 보여주는 부분 */}
      <ReactCrop
        crop={crop}
        onChange={(c, percentCrop) => setCrop(percentCrop)}
        onComplete={(c) => setCompletedCrop(c)}
        aspect={aspect}
      >
        <Image
          ref={imgRef}
          alt="Crop me"
          src={imgSrc}
          width={500}
          height={500}
          style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
          onLoad={onImageLoad}
        />
      </ReactCrop>

      {/* 자른 이미지를 보여주는 부분 */}
      <canvas
        ref={previewCanvasRef}
        style={{
          border: "1px solid black",
          objectFit: "contain",
          width: completedCrop?.width,
          height: completedCrop?.height,
          display: "none" // 이 부분은 필요에 따라 수정 가능
        }}
      />
    </>
  );
};

export default ImageCropper;
