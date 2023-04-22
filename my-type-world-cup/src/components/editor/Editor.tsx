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
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">제목:</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <br />

      <label htmlFor="description">설명:</label>
      <textarea
        id="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <br />

      <div>
        <label>
          <input
            type="radio"
            name="public"
            value="public"
            checked={isPublic}
            onChange={handlePublicChange}
          />
          공개
        </label>

        <label>
          <input
            type="radio"
            name="public"
            value="private"
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
