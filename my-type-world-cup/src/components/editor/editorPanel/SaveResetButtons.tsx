// ButtonGroup의 props 타입 정의
interface ButtonGroupProps {
  onSave: () => Promise<void>;
  onReset: () => void;
}

const SaveResetButtons = ({ onSave, onReset }: ButtonGroupProps) => {
  return (
    <>
      <button
        type="button"
        onClick={onSave} // onSave 연결
        className="mt-20 px-4 py-2 bg-main text-white rounded-md hover:scale-105 transition-all"
      >
        저장
      </button>
      <button
        type="button"
        onClick={onReset} // onReset 연결
        className="mt-4 sm:mt-8 px-4 py-2 bg-main text-white rounded-md hover:scale-105 transition-all"
      >
        새로 만들기
      </button>
    </>
  );
};

export default SaveResetButtons;
