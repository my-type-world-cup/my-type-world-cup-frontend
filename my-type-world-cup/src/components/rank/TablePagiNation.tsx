import Image from "next/image";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const TablePagiNation: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	setCurrentPage
}) => {
	const prevPage = currentPage > 1 ? currentPage - 1 : null;
	const nextPage = currentPage < totalPages ? currentPage + 1 : null;
	const pageRange = 2;

	let startPage = currentPage - pageRange;
	let endPage = currentPage + pageRange;

	//다시 확인할것

	if (startPage < 1) {
		endPage += 1 - startPage;
		startPage = 1;
		if (endPage > totalPages) endPage = totalPages;
	} else if (endPage > totalPages) {
		startPage -= endPage - totalPages;
		endPage = totalPages;
		if (startPage < 1) startPage = 1;
	}

	const pages = Array.from(
		{ length: endPage - startPage + 1 },
		(_, i) => startPage + i
	);

	return (
		<nav>
			<ul className='flex justify-center list-none m-0 p-0 mt-10'>
				{
					<li
						className={
							prevPage
								? "mx-1 py-2 flex items-center gap-5"
								: "mx-1 py-2 flex items-center gap-5 pointer-events-none opacity-0"
						}>
						<Image
							src='/icon/leftArrow.svg'
							alt='first'
							className='cursor-pointer text-center hover:scale-125'
							width={15}
							height={10}
						/>
						<Image
							src='/icon/left.svg'
							alt='prev'
							className='mr-2 cursor-pointer text-center hover:scale-125'
							width={8}
							height={10}
						/>
					</li>
				}

				{pages.map((page) => (
					<li
						key={page}
						onClick={() => setCurrentPage(page)}
						className='mx-1'>
						<div
							className={
								currentPage === page
									? " cursor-pointer block py-2 px-3 text-center text-white bg-main"
									: " cursor-pointer block py-2 px-3 text-center hover:text-white hover:bg-main"
							}>
							{page}
						</div>
					</li>
				))}

				{
					<li
						className={
							nextPage
								? "mx-1 py-2 flex items-center gap-5"
								: "mx-1 py-2 flex items-center gap-5 pointer-events-none opacity-0"
						}>
						<Image
							src='/icon/right.svg'
							alt='prev'
							className='ml-2 cursor-pointer text-center hover:scale-125'
							width={8}
							height={10}
						/>
						<Image
							src='/icon/lastArrow.svg'
							alt='first'
							className='cursor-pointer text-center hover:scale-125'
							width={15}
							height={10}
						/>
					</li>
				}
			</ul>
		</nav>
	);
};

export default TablePagiNation;
