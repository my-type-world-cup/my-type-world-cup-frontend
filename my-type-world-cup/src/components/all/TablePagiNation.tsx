import { calculatePageRange } from "@/lib/Helper";
import NavigationButton from "../rank/NavigationButton";
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
	const pages = calculatePageRange(currentPage, totalPages, 2);

	return (
		<nav>
			<ul className="flex justify-center list-none m-0 p-0 mt-10">
				<NavigationButton
					src="/icon/leftArrow.svg"
					alt="first"
					width={15}
					height={10}
					disabled={!prevPage}
					onClick={() => setCurrentPage(1)}
				/>
				<NavigationButton
					src="/icon/left.svg"
					alt="prev"
					width={8}
					height={10}
					disabled={!prevPage}
					onClick={() => setCurrentPage(prevPage!)}
				/>

				{pages.map((page) => (
					<li key={page} onClick={() => setCurrentPage(page)} className="mx-1">
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

				<NavigationButton
					src="/icon/right.svg"
					alt="next"
					width={8}
					height={10}
					disabled={!nextPage}
					onClick={() => setCurrentPage(nextPage!)}
				/>
				<NavigationButton
					src="/icon/lastArrow.svg"
					alt="last"
					width={15}
					height={10}
					disabled={!nextPage}
					onClick={() => setCurrentPage(totalPages)}
				/>
			</ul>
		</nav>
	);
};

export default TablePagiNation;
