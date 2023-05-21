import React, { useRef, useState } from "react";

import Image from "next/image";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import { canvasPreview } from "../../lib/editor/canvasPreview";
import { useDebounceEffect } from "../../lib/editor/useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";

// 이것은 % 비율의 aspect crop을 만들고 중앙 정렬하는 방법을 보여주기 위한 것입니다.
// 이것은 조금 더 까다로우므로 몇 가지 도우미 함수를 사용합니다.

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
        height: 50,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageEditor() {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(1 / 1);
  console.log(completedCrop, "completedCrop");
  //파일 읽음
  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files);
      setCrop(undefined); //이미지 간 자르기 미리보기를 업데이트합니다
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
      });
    }
  }
  //이미지 로드
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      console.log(width, height, aspect);
      console.log(centerAspectCrop(width, height, aspect));
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function onDownloadCropClick() {
    if (!previewCanvasRef.current) {
      throw new Error("Crop canvas does not exist");
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error("Failed to create blob");
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      blobUrlRef.current = URL.createObjectURL(blob);
      setImgSrc(blobUrlRef.current);
      hiddenAnchorRef.current!.href = blobUrlRef.current;
      hiddenAnchorRef.current!.click();
    });
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        console.log("렌더링~");
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  // function handleToggleAspectClick() {
  //   //비율 조정
  //   if (aspect) {
  //     setAspect(undefined);
  //   } else if (imgRef.current) {
  //     const { width, height } = imgRef.current;
  //     setAspect(16 / 9);
  //     setCrop(centerAspectCrop(width, height, 16 / 9));
  //   }
  // }

  return (
    <div className="mt-10">
      <div className="Crop-Controls">
        <input type="file" onChange={onSelectFile} />

        <div className="mt-4 flex flex-col justify-center text-gray">
          <div className="flex h-8 flex-1 items-center mb-1">
            <label htmlFor="scale-input" className="w-16">
              Scale
            </label>
            :
            <input
              id="scale-input"
              type="text"
              step="0.1"
              value={scale.toFixed(1)}
              disabled={!imgSrc}
              className="w-20 border border-gray rounded px-2 py-1 mx-3"
              readOnly
            />
            <button
              type="button"
              className="input-button"
              onClick={() => setScale(scale + 0.1)}
              disabled={!imgSrc}
            >
              <Image
                src="/icon/grayPlus.svg"
                alt="plus"
                className="cursor-pointer"
                width={20}
                height={18}
                priority
              />
            </button>
            <button
              type="button"
              className="input-button ml-2"
              onClick={() => setScale(scale - 0.1)}
              disabled={!imgSrc}
            >
              <Image
                src="/icon/grayMinus.svg"
                alt="minus"
                className="cursor-pointer"
                width={20}
                height={18}
                priority
              />
            </button>
          </div>

          <div className="flex h-8 flex-1 items-center mb-4">
            <label htmlFor="rotate-input" className="w-16">
              Rotate
            </label>
            :
            <input
              id="rotate-input"
              type="text"
              step="0.1"
              value={rotate}
              disabled={!imgSrc}
              readOnly
              className="w-20 border border-gray rounded px-2 py-1 mx-3"
            />
            <button
              type="button"
              className="input-button"
              onClick={() => setRotate(rotate + 10)}
              disabled={!imgSrc}
            >
              <Image
                src="/icon/grayPlus.svg"
                alt="plus"
                className="cursor-pointer"
                width={20}
                height={18}
                priority
              />
            </button>
            <button
              type="button"
              className="input-button ml-2"
              onClick={() => setRotate(rotate - 10)}
              disabled={!imgSrc}
            >
              <Image
                src="/icon/grayMinus.svg"
                alt="minus"
                className="cursor-pointer"
                width={20}
                height={18}
                priority
              />
            </button>
          </div>
        </div>
      </div>
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
        >
          <Image
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            width={500}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            height={500}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      {!!completedCrop && (
        <>
          <div className="flex items-center">
            <canvas
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: "175px",
                height: "175px",
                backgroundColor: "blue",
              }}
            />
          </div>
          <div>
            <button onClick={onDownloadCropClick}>Download Crop</button>
            <a
              ref={hiddenAnchorRef}
              download
              style={{
                position: "absolute",
                top: "-200vh",
                visibility: "hidden",
              }}
            >
              Hidden download
            </a>
          </div>
        </>
      )}
    </div>
  );
}
