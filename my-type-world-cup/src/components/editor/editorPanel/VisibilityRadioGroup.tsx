import { ChangeEvent } from "react";

// RadioGroup의 props 타입 정의
interface RadioGroupProps {
  isPublic: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const VisibilityRadioGroup = ({ isPublic, onChange }: RadioGroupProps) => {
  return (
    <div className="flex justify-around items-center mt-6">
      <label className="flex items-center">
        <input
          type="radio"
          name="public"
          value="public"
          className="mr-3 w-6 h-6"
          checked={isPublic}
          onChange={onChange} // 핸들러 연결
        />
        공개
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          name="private"
          value="private"
          className="mr-3 w-6 h-6"
          checked={!isPublic}
          onChange={onChange} // 핸들러 연결
        />
        비공개
      </label>
    </div>
  );
};

export default VisibilityRadioGroup;
