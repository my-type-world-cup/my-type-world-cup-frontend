import { post_candidates } from "@/api/user";
import { blobToServer } from "@/lib/editor/base64";
import type { Imgbb_result, Save_data } from "@/type/Types";
import Image from "next/image";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useRef,
  useState
} from "react";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "../../../lib/editor/canvasPreview";
import { useDebounceEffect } from "../../../lib/editor/useDebounceEffect";
import BigModal from "../../all/modal/BigModal";
import ShareModal from "../../all/modal/ShareModal";
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

type Props = {
  imgSrc: string;
  setIsMake: Dispatch<SetStateAction<boolean>>;
  setImgSrc: Dispatch<SetStateAction<string>>;
  candidateId: number;
  id: number | undefined;
  accessToken: string | null;
  setCandidateId: Dispatch<SetStateAction<number>>;
};

export default function ImageEditor({
  id,
  imgSrc,
  setImgSrc,
  candidateId,
  setIsMake,
  accessToken,
  setCandidateId
}: Props) {
  // const [imgSrc, setImgSrc] = useState("");
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
  //파일 읽음
  // function onSelectFile(e: ChangeEvent<HTMLInputElement>) {
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
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameRef.current?.value;

    // 여기에서 이름을 처리하거나 다른 작업을 수행합니다.
  };
  //이미지 로드
  function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;

      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  const uploadHandler = async (image: string) => {
    //최종 저장
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

      const response: Imgbb_result = await blobToServer(image);
      const data: Save_data = {
        name: nameRef.current?.value || "익명",
        image: response.data.image.url,
        thumb: response.data.thumb.url,
        worldCupId: id || 0,
        id: candidateId
      };
      console.log(data, "간다");
      if (!accessToken) throw new Error("accessToken is null");

      post_candidates(accessToken, data)
        .then((res: Save_data) => {
          const save = {
            ...res
          };
          console.log(save, "성공"); //수정해야함

          setImgSrc("");

          if (nameRef.current) {
            nameRef.current.value = ""; // 값 초기화
          }
          setCandidateId(0);
          setIsMake(false);
        })
        .catch((err) => {
          console.log(err, "실패");
          // if (err === 401) {
          //   console.log(accessToken);
          //   post_refresh();
          //   console.log("로그인 해야해~");
          // }
        });

      //tumbㄷ 추가
      const name = nameRef.current?.value;

      setModal(!modal); //모달 제거
      setLoading((el) => !el);
    } catch (error) {
      // 에러 처리를 위한 로직 추가
      console.error(error);
    }
  };

  function onDownloadCropClick() {
    //저장하기 버튼
    if (nameRef.current?.value !== "") {
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
    } else {
      setModalMessage("이름을 작성해주세요");
      setModalVisible(!modalVisible);
    }
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

  return (
    <div className="mt-4 mb-4">
      {!!imgSrc ? (
        <div className="mt-4 flex flex-row text-gray" ref={scrollRef}>
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
              />
            </button>
          </div>
        </div>
      ) : (
        <h2 className="h-64 flex justify-center items-center">
          <span className="text-warning"> 로컬 파일 </span> &nbsp; 혹은 &nbsp;
          <span className="text-warning">검색</span>을 통해 이미지를
          등록해주세요!
        </h2>
      )}

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
            style={{
              transform: `scale(${scale}) rotate(${rotate}deg)`
            }}
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
                display: "none"
              }}
            />
          </div>
          <div>
            <h3 className="text-xl my-2">이름 입력하기</h3>
            <input
              type="text"
              ref={nameRef}
              className="w-full py-2 px-4 border border-gray rounded-md focus:outline-none focus:ring-2"
            />
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
                visibility: "hidden"
              }}
            >
              Hidden download
            </a>
          </div>
        </>
      )}

      <BigModal
        message="이미지를 선택하시겠습니까?"
        modalVisible={modal}
        setModalVisible={setModal}
        setLoading={setLoading}
        img={img}
        uploadHandler={uploadHandler}
        loading={loading}
        setIsMake={setIsMake}
      />
      <ShareModal
        message={modalMessage}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </div>
  );
}
