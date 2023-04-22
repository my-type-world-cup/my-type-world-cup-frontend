import { ChangeEvent, FormEvent, useState } from "react";

interface EditorProps {
  onSave: (title: string, description: string, isPublic: boolean) => void;
}

const Editor = ({ onSave }: EditorProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleSave = () => {
    onSave(title, description, isPublic);
  };

  const handlePublicChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.value === "public");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSave();
  };

  return (
    <form className="mt-8 mx-8 text-lg flex flex-col" onSubmit={handleSubmit}>
      <label htmlFor="title">제목</label>
      <input
        type="text"
        className="border-b-[1px] border-main text-gray mt-1"
        placeholder="이상형 월드컵의 제목을 입력해주세요"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <br />

      <label htmlFor="description">설명</label>
      <textarea
        className="border-[1px] border-main mt-1"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <br />

      <div className="flex justify-around items-center">
        <label className="flex items-center">
          <input
            type="radio"
            name="public"
            value="public"
            className="mr-3 w-6 h-6"
            checked={isPublic}
            onChange={handlePublicChange}
          />
          공개
        </label>

        <label className="flex items-center ">
          <input
            type="radio"
            name="public"
            value="private"
            className="mr-3 w-6 h-6"
            checked={!isPublic}
            onChange={handlePublicChange}
          />
          비공개
        </label>
      </div>

      <button type="submit">저장</button>
    </form>
  );
};
export default Editor;
