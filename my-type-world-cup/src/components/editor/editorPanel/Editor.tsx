import useEditorSaveAndReset from "@/lib/hooks/useEditorSaveAndReset";
import useEditorState from "@/lib/hooks/useEditorState";
import { Dispatch, SetStateAction } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { accessTokenState, postWorldcup } from "../../../lib/atom/atom";
import type { Editor_step, Post_res } from "../../../type/Types";
import EditorDescriptionInput from "./EditorDescriptionInput";
import EditorPasswordInput from "./EditorPasswordInput";
import EditorTitleInput from "./EditorTitleInput";
import SaveResetButtons from "./SaveResetButtons";
import VisibilityRadioGroup from "./VisibilityRadioGroup";
interface EditorProps {
  setIsNumber: Dispatch<SetStateAction<Editor_step>>;
}

const Editor = ({ setIsNumber }: EditorProps) => {
  const [worldcup, setWorldcup] = useRecoilState<Post_res | null>(postWorldcup);
  const accessToken = useRecoilValue(accessTokenState);
  const {
    title,
    setTitle,
    description,
    setDescription,
    isPublic,
    setIsPublic,
    password,
    setPassword,
    isValid,
    setIsValid
  } = useEditorState(worldcup);

  const { handleSave, handleReset, handlePublicChange, handlePasswordChange } =
    useEditorSaveAndReset({
      setWorldcup,
      setIsNumber,
      accessToken,
      worldcup,
      setIsValid,
      setIsPublic,
      setTitle,
      setDescription,
      setPassword,
      title,
      description,
      isPublic,
      password
    });

  return (
    <div
      className="sm:pt-20 mt-4 sm:mt-8 mx-8 text-lg flex flex-col min-h-screen"
      // onSubmit={handleSubmit}
    >
      <EditorTitleInput title={title} setTitle={setTitle} />
      <EditorDescriptionInput
        description={description}
        setDescription={setDescription}
      />

      {!isPublic && (
        <EditorPasswordInput
          password={password}
          onChangePassword={handlePasswordChange}
          isValid={isValid}
          isPublic={isPublic}
        />
      )}

      <VisibilityRadioGroup isPublic={isPublic} onChange={handlePublicChange} />
      <SaveResetButtons onSave={handleSave} onReset={handleReset} />
    </div>
  );
};
export default Editor;
