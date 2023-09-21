// DescriptionInput.tsx
import React, { ChangeEvent } from "react";

interface DescriptionInputProps {
  description: string;
  setDescription: (description: string) => void;
}

const EditorDescriptionInput: React.FC<DescriptionInputProps> = ({
  description,
  setDescription
}) => (
  <>
    <label htmlFor="description">설명</label>
    <textarea
      className="border-[1px] border-main mt-1 outline-none p-2"
      value={description}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
        setDescription(event.target.value)
      }
      rows={3}
    />
    <br />
  </>
);

export default EditorDescriptionInput;
