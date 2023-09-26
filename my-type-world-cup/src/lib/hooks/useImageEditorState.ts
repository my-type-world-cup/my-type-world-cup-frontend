// useImageEditor.ts
import { useEffect, useRef, useState } from "react";
import { Crop, PixelCrop } from "react-image-crop"; // Crop과 PixelCrop 타입을 가져옵니다.
import { canvasPreview } from "../editor/canvasPreview"; // canvasPreview 함수를 가져옵니다.
import { useDebounceEffect } from "../editor/useDebounceEffect"; // useDebounceEffect 훅을 가져옵니다.

type UseImageEditorProps = {
  imgSrc: string;
  // 추가적으로 필요한 초기화 값이나 함수들
};

const useImageEditorState = ({ imgSrc }: UseImageEditorProps) => {
  const [modal, setModal] = useState<boolean>(false);
  const [img, setImg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(1 / 1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [modalMessage, setModalMessage] =
    useState<string>("이름을 작성해주세요");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // 이미지 변경 시 초기화
  useEffect(() => {
    setScale(1);
    setRotate(0);
    setCrop(undefined);
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [imgSrc]);

  //미리보기 함수, 최종적으로 진행된 함수 실행
  //prop 순으로 함수, 시간, dependency
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

  return {
    scrollRef,
    modal,
    setModal,
    img,
    setImg,
    loading,
    setLoading,
    crop,
    setCrop,
    completedCrop,
    setCompletedCrop,
    scale,
    setScale,
    rotate,
    setRotate,
    aspect,
    setAspect,
    previewCanvasRef,
    imgRef,
    blobUrlRef,
    hiddenAnchorRef,
    nameRef,
    modalMessage,
    setModalMessage,
    modalVisible,
    setModalVisible
  };
};

export default useImageEditorState;
