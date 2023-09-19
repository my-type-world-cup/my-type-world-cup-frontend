import Image from "next/image";
import { useState } from "react";
import loadingGif from "../../../public/icon/loading.gif";

type ZoomedImageProps = {
	imageUrl: string;
	zoomed: boolean;
	setZoomed: React.Dispatch<React.SetStateAction<boolean>>;
};

//준비물 zoom usestate 와 image
const ZoomedImage = ({ imageUrl, setZoomed }: ZoomedImageProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleOverlayClick = () => {
		setZoomed(false);
	};

	return (
		<div
			className="bg-black bg-opacity-50 fixed left-0 top-0 w-full h-full z-50 flex justify-center items-center pointer-events-auto"
			onClick={handleOverlayClick}>
			{!isLoading && (
				<Image
					src={loadingGif}
					alt={"loading"}
					width={296}
					height={296}
					className="absolute"
				/>
			)}

			<Image
				src={imageUrl}
				className="max-w-full max-h-full mx-8 z-10"
				alt="Zoomed Image"
				width={350}
				onLoadingComplete={() => setIsLoading(true)}
				height={400}
			/>
		</div>
	);
};
export default ZoomedImage;
