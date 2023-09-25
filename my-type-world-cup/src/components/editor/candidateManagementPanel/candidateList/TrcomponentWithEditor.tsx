import { patch_candidates } from "@/api/user";
import type { Rank_res_data, Save_data } from "@/type/Types";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from "react";
import loadingGif from "../../../../../public/icon/loading.gif";
import EventModal from "../../../all/modal/EventModal";
import ZoomedImage from "../../../all/modal/ZoomImage";

type Props = {
  rank: Rank_res_data;
  i: number;
  currentPage: number;
  pageSize: number;
  handleDelete: (id: number) => void;
  setIsMake: Dispatch<SetStateAction<boolean>>;
  setCandidateId: Dispatch<SetStateAction<number>>;
  accessToken: string | null;
};

type Handler = () => void;
export default function TrcomponentWithEditor({
  rank,
  i,
  currentPage,
  pageSize,
  setIsMake,
  handleDelete,
  setCandidateId,
  accessToken
}: Props) {
  const [text, setText] = useState<string>(rank.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const [savedText, setSavedText] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [handlerState, setHandlerState] = useState<Handler>(() => {});
  const [zoomed, setZoomed] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!isEditing && inputRef.current) {
      inputRef.current.focus();
      console.log("하이");
    }
  }, [isEditing]);

  useEffect(() => {
    setText(rank.name);
  }, [rank.name]);

  const handler = () => {
    setIsMake(true);
    setCandidateId(rank.id);
    // 후보로 바꿔야함,
    // 아이디 넘겨줘야함
  };
  const handleClick = () => {
    setIsEditing(!isEditing);
    setSavedText(text);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleSave = () => {
    setIsEditing(!isEditing);
    const data: Save_data = { ...rank, name: text };
    patch_candidates(accessToken || "없음", data)
      .then((res) => {
        console.log(res, "res");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const handleCancel = () => {
    setIsEditing(!isEditing);
    setText(savedText);
  };

  return (
    <tr className="border-hr border" key={rank.id}>
      <td className="text-center text-gray">
        {i + 1 + (currentPage - 1) * pageSize}
      </td>
      <td>
        {/* 이미지 */}
        <div className="relative overflow-hidden h-20 flex items-center justify-center">
          <Image
            className="cursor-pointer z-20"
            src={rank.thumb}
            alt="start"
            width={100}
            height={60}
            onClick={() => setZoomed(!zoomed)}
            onLoadingComplete={() => setIsLoading(true)}
            priority
          />
          {/* 로딩 이미지 */}
          {!isLoading && (
            <div className="absolute z-10">
              <Image
                src={loadingGif}
                alt={"loading"}
                width={200}
                height={200}
                className="cursor-pointer"
              />
            </div>
          )}
        </div>
      </td>
      {/* 이름 및 수정 기능 */}
      <td className="text-gray text-center w-32">
        {isEditing ? (
          <div
            className="w-32 truncate text-sm font-bold cursor-pointer hover:underline"
            onClick={handleClick}
          >
            {text}
          </div>
        ) : (
          <input
            type="text"
            ref={inputRef}
            value={text}
            onChange={handleChange}
            onBlur={handleCancel}
            spellCheck={false}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave();
              }
            }}
            className="w-32 border border-gray p-2"
          />
        )}
      </td>
      <td>
        {/* 이미지 수정 및 삭제*/}
        <div className={"flex justify-evenly items-center text-center "}>
          <Image
            src="/icon/picture.svg"
            alt="picture"
            className="cursor-pointer hover:scale-125 mr-2 sm:mr-0"
            width={30}
            height={30}
            onClick={() => {
              setMessage("수정하시겠습니까?");
              setHandlerState(() => handler);
              setModalVisible(true);
            }}
          />
          <Image
            src="/icon/delete.svg"
            alt="delete"
            className="cursor-pointer hover:scale-125 mr-2 sm:mr-0"
            width={20}
            height={20}
            onClick={() => {
              setMessage("삭제하시겠습니까?");
              setHandlerState(() => () => handleDelete(rank.id));
              setModalVisible(true);
            }}
          />
        </div>

        {/* 알림 모달 */}
        <EventModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          message={message}
          img={rank.thumb}
          handleDelete={handlerState}
        />

        {/* 이미지 확대 모달*/}
        {zoomed && (
          <ZoomedImage
            zoomed={zoomed}
            setZoomed={setZoomed}
            imageUrl={rank.image}
          />
        )}
      </td>
    </tr>
  );
}
