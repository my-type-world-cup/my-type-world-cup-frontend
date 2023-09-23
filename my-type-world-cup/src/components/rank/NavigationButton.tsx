import Image from "next/image";

type props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  disabled?: boolean;
  onClick?: () => void;
};

const NavigationButton = ({
  src,
  alt,
  width,
  height,
  disabled = false,
  onClick
}: props) => (
  <button
    className={`mx-1 py-2 flex items-center gap-5 ${
      disabled ? "pointer-events-none opacity-0" : ""
    }`}
    onClick={onClick}
    type="button"
  >
    <Image
      src={src}
      alt={alt}
      className="cursor-pointer text-center hover:scale-125"
      width={width}
      height={height}
    />
  </button>
);

export default NavigationButton;
