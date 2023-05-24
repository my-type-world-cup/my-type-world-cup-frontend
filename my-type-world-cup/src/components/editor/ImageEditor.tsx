import { blobToServer } from "@/lib/editor/base64";
import type { imgbb_result } from "@/type/Types";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "../../lib/editor/canvasPreview";
import { useDebounceEffect } from "../../lib/editor/useDebounceEffect";
import BigModal from "../all/BigModal";
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

type Props = {
  imgSrc: string;
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
  setSaveList: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function ImageEditor({ imgSrc, setImgSrc, setSaveList }: Props) {
  // const [imgSrc, setImgSrc] = useState("");
  const [modal, setModal] = useState<boolean>(false);
  const [img, setImg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(1 / 1);

  useEffect(() => {
    setScale(1);
    setRotate(0);
    setCrop(undefined);
  }, [imgSrc]);
  //파일 읽음
  // function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
  //   if (e.target.files && e.target.files.length > 0) {
  //     // console.log(e.target.files);
  //     // setCrop(undefined); //이미지 간 자르기 미리보기를 업데이트합니다
  //     const reader = new FileReader();
  //     reader.readAsDataURL(e.target.files[0]);
  //     reader.addEventListener("load", () => {
  //       setImgSrc(reader.result?.toString() || "");
  //     });
  //   }
  // }

  //이미지 로드
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;

      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  const uploadHandler = async (image: string) => {
    try {
      setLoading((el) => !el);
      // await fetch(image)
      //   .then((response) => response.blob())
      //   .then((blob) => {
      //     // Use the image blob as needed
      //     console.log(blob);
      //     // Further processing with the blob (e.g., display or save)
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching image:", error);
      //   });

      const response: imgbb_result = await blobToServer(image);
      setSaveList((prev) => [response.data.image.url, ...prev]);
      //tumbㄷ 추가
      setImgSrc("");
      console.log("짠");
      setModal(!modal); //모달 제거
      setLoading((el) => !el);
    } catch (error) {
      // 에러 처리를 위한 로직 추가
      console.error(error);
    }
  };

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
      setImg(blobUrlRef.current);
      setModal(!modal);
      // setSaveList((prev) => [blobUrlRef.current, ...prev]); //convert할 것
      // hiddenAnchorRef.current!.href = blobUrlRef.current;
      // hiddenAnchorRef.current!.click();
      // console.log(blobUrlRef.current);
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
    <div className="mt-10 mb-4">
      <div className="Crop-Controls">
        {!!imgSrc && (
          <div className="mt-4 flex flex-row text-gray">
            <div className="flex h-8 mr-4 items-center mb-2">
              <label htmlFor="scale-input" className="w-16">
                Scale
              </label>
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

            <div className="flex h-8 items-center mb-2">
              <label htmlFor="rotate-input" className="w-16">
                Rotate
              </label>

              <button
                type="button"
                className="input-button ml-2"
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
        )}
      </div>
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(c, percentCrop) => {
            setCrop(percentCrop);
          }}
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
      {!!completedCrop && !!imgSrc && (
        <>
          <div className="">
            <canvas
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop.width,
                height: completedCrop.height,
                display: "none",
              }}
            />
          </div>
          <div>
            <button
              onClick={onDownloadCropClick}
              className="bg-main rounded-md hover:scale-110 text-white w-full h-12 mt-4 mb-2"
            >
              저장하기
            </button>
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
      <BigModal
        message="이미지를 선택하시겠습니까?"
        isCopied={modal}
        setIsCopied={setModal}
        img={img}
        uploadHandler={uploadHandler}
        loading={loading}
      />
    </div>
  );
}
