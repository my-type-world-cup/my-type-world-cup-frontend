import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import DropDown from "./DropDown";

const Header = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const router = useRouter();
	const { pathname } = router;
	const handleHome = () => {
		router.push("/");
		setIsDropdownOpen(false);
	};
	const pages = [
		{ path: "", word: "이상형 월드컵" },
		{ path: "game", word: "우승자" },
		{ path: "editor", word: "월드컵 만들기" },
		{ path: "rank", word: "랭킹" },
		{ path: "mypage", word: "회원정보" },
		{ path: "myworldcup", word: "나만의 월드컵" },
		{ path: "editors", word: "월드컵 만들기" }
	];
	// 나중에 해당 주소에 맞추어서 갈 수 있도록 수정해야함
	const gamePath = pathname.split("/")[1];
	const page = pages.filter((page) => page.path === gamePath)[0];
	// console.log(pathname, gamePath, page);
	return (
		<div className='relative'>
			<header className='bg-main flex w-full relative z-40 px-4 py-3 items-center justify-between'>
				<div className='w-10 h-10'>
					<Image
						src='/icon/whiteDolphin2.svg'
						alt='Home'
						className='cursor-pointer hover:scale-125 mt-[4px]'
						width={100}
						height={100}
						onClick={handleHome}
						priority
					/>
				</div>
				<h1 className='text-2xl tracking-wider font-medium text-white'>
					{page?.word}
				</h1>
				<Image
					src='/icon/hambuger.svg'
					alt='dropdown'
					className='cursor-pointer hover:scale-125'
					width={30}
					height={22}
					onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				/>
			</header>
			<DropDown
				isOpen={isDropdownOpen}
				setIsOpen={setIsDropdownOpen}
			/>
		</div>
	);
};

export default Header;
