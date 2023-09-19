import Image from "next/image";
type ButtonProps = {
	icon: string;
	alt: string;
	label: string;
	onClick: () => void;
};

const GameButton = ({ icon, alt, label, onClick }: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			className='bg-main px-2 h-10 sm:px-4 space-x-2 mr-2 flex items-center rounded-lg hover:scale-110 cursor-pointer text-base'>
			<Image src={icon} alt={alt} width={20} height={20} />
			<p>{label}</p>
		</button>
	);
};

export default GameButton;
