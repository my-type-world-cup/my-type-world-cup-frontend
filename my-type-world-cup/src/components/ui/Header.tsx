import Image from "next/image";
import { useState } from "react";
import DropDown from "./DropDown";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <header className="bg-main flex w-full relative z-20 px-4 py-3 items-center justify-between">
        <Image
          src="/icon/finger.svg"
          alt="Home"
          className="cursor-pointer"
          width={30}
          height={20}
          priority
        />
        <span className="text-2xl tracking-wider font-medium text-white">
          이상형 월드컵
        </span>
        <Image
          src="/icon/hambuger.svg"
          alt="dropdown"
          className="cursor-pointer "
          width={30}
          height={20}
          priority
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
      </header>
      <DropDown isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen} />
    </div>
  );
};

export default Header;
