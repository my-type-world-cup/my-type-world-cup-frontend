import { post_candidates } from "@/api/user";
import { blobToServer } from "@/lib/editor/base64";
import useImageEditorState from "@/lib/hooks/useImageEditorState";
import type { Imgbb_result, Save_data } from "@/type/Types";
import { Dispatch, SetStateAction } from "react";
import "react-image-crop/dist/ReactCrop.css";
import BigModal from "../../../all/modal/BigModal";
import ShareModal from "../../../all/modal/ShareModal";
import ControlButton from "./ControlButton";
import ImageCropper from "./ImageCropper";
// 이것은 % 비율의 aspect crop을 만들고 중앙 정렬하는 방법을 보여주기 위한 것입니다.
// 이것은 조금 더 까다로우므로 몇 가지 도우미 함수를 사용합니다.

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
  const {
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
    setModalVisible,
    scrollRef
  } = useImageEditorState({ imgSrc });

  const uploadHandler = async (image: string) => {
    //최종 저장
    try {
      setLoading(true); // 로딩 상태 시작

      if (!accessToken) throw new Error("accessToken is null");

      const response: Imgbb_result = await blobToServer(image);

      const data: Save_data = {
        name: nameRef.current?.value || "익명",
        image: response.data.image.url,
        thumb: response.data.thumb.url,
        worldCupId: id || 0,
        id: candidateId
      };

      // 데이터 저장
      const res: Save_data = await post_candidates(accessToken, data);

      console.log(res, "저장 성공");

      setImgSrc("");
      if (nameRef.current) {
        nameRef.current.value = ""; // 값 초기화
      }

      setCandidateId(0);
      setIsMake(false);
      setModal(false); // 모달 제거
    } catch (error) {
      console.error(error); // 에러 처리
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  //자른 사진 최종 업데이트 함수
  function onDownloadCropClick() {
    const nameValue = nameRef.current?.value;
    const previewCanvas = previewCanvasRef.current;

    // 이름이 없을 경우
    if (!nameValue) {
      setModalMessage("이름을 작성해주세요");
      setModalVisible(true);
      return;
    }

    // previewCanvas가 없을 경우
    if (!previewCanvas) {
      // 여기서는 에러를 던지기보다 사용자에게 알려줄 수 있는 다른 방법을 고려해보세요.
      console.error("Crop canvas does not exist");
      return;
    }

    // Blob 생성
    previewCanvas.toBlob((blob) => {
      if (!blob) {
        // Blob 생성 실패
        console.error("Failed to create blob");
        return;
      }

      // 이전 Blob URL 해제
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }

      // 새 Blob URL 생성
      blobUrlRef.current = URL.createObjectURL(blob);

      // 상태 업데이트
      setImg(blobUrlRef.current);
      setModal(!modal);
    });
  }

  return (
    <div className="mt-4 mb-4">
      {imgSrc ? (
        <>
          <div className="mt-4 flex flex-row text-gray" ref={scrollRef}>
            <ControlButton
              label="Scale"
              onIncrement={() => setScale(scale + 0.1)}
              onDecrement={() => setScale(scale - 0.1)}
            />
            <ControlButton
              label="Rotate"
              onIncrement={() => setRotate(rotate + 10)}
              onDecrement={() => setRotate(rotate - 10)}
            />
          </div>
          <ImageCropper
            crop={crop}
            setCrop={setCrop}
            setCompletedCrop={setCompletedCrop}
            aspect={aspect}
            imgSrc={imgSrc}
            scale={scale}
            rotate={rotate}
            imgRef={imgRef}
            previewCanvasRef={previewCanvasRef}
            completedCrop={completedCrop}
          />

          <label className="text-xl my-2">이름 입력하기</label>
          <input
            type="text"
            ref={nameRef}
            className="w-full py-2 px-4 border border-gray rounded-md focus:outline-none focus:ring-2"
          />
          <button
            onClick={onDownloadCropClick}
            className="bg-main rounded-md hover:scale-110 text-white w-full h-12 mt-8 mb-1"
          >
            저장하기
          </button>
        </>
      ) : (
        <h2 className="h-64 flex justify-center items-center  whitespace-nowrap">
          <span className="text-warning"> 파일 선택</span>과&nbsp;
          <span className="text-warning">검색</span>을 통해 이미지를
          등록해주세요!
        </h2>
      )}

      <BigModal
        message="이미지를 선택하시겠습니까?"
        modalVisible={modal}
        setModalVisible={setModal}
        setLoading={setLoading}
        img={img}
        uploadHandler={uploadHandler}
        loading={loading}
      />
      <ShareModal
        message={modalMessage}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </div>
  );
}
