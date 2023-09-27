import Image from "next/image"; // 다음 이미지 컴포넌트를 임포트 할 가정

interface ControlButtonProps {
  // props에 대한 인터페이스 정의
  label: string;
  onIncrement: () => void;
  onDecrement: () => void;
}

// ControlButton 컴포넌트 정의
const ControlButton = ({
  label,
  onIncrement,
  onDecrement
}: ControlButtonProps) => {
  return (
    <div className="flex h-8 items-center mb-2 mr-4">
      <label className="w-16">{label}</label> {/* 레이블 출력 */}
      <button type="button" onClick={onIncrement}>
        {/* 증가 함수 연결 */}
        <Image
          src="/icon/grayPlus.svg"
          alt="plus"
          className="cursor-pointer"
          width={20}
          height={18}
        />
      </button>
      <button type="button" className="ml-2" onClick={onDecrement}>
        {/* 감소 함수 연결 */}
        <Image
          src="/icon/grayMinus.svg"
          alt="minus"
          className="cursor-pointer"
          width={20}
          height={18}
        />
      </button>
    </div>
  );
};

export default ControlButton;
