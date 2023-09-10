type Candidate = {
	id: number;
	name: string;
	image: string;
	thumb: string;
};

type Result_data = {
	id: number;
	matchUpGameCount: number;
	winCount: number;
};

type MainWorldcup = {
	id: number;
	title: string;
	description: string;
	candidateSimpleResponseDtos: Candidate[];
};

type PageInfo = {
	first: boolean;
	page: number;
	size: number;
	totalElements: number;
	totalPages: number;
	last: boolean;
};

type WorldcupsResponse = {
	data: MainWorldcup[];
	pageInfo: PageInfo;
};

type IngameModalData = {
	id: number;
	title: string;
	description: string;
	visibility: boolean;
	candidatesCount: number;
};

type Round = 32 | 16 | 8 | 4 | 2;

type Contestant = {
	id: number;
	name: string;
	image: string;
	thumb: string;
};

type Rank_Data = {
	worldCupId: number;
	password: string | null;
};

type Rank_res = {
	data: Rank_res_data[];
	pageInfo: Rank_res_pageInfo;
};

type Rank_res_data = {
	id: number;
	name: string;
	image: string;
	finalWinCount: number;
	winCount: number;
	matchUpWorldCupCount: number;
	matchUpGameCount: number;
	worldCupId: number;
	thumb: string;
};

type Rank_res_pageInfo = {
	first: boolean;
	page: number;
	size: number;
	totalElements: number;
	totalPages: number;
	last: boolean;
};
type Comment_list_data = {
	id: number;
	content: string;
	candidateName: string;
	likesCount: number;
	isLiked: boolean;
	createdAt: string;
	modifiedAt: string;
	memberId: number | null;
	nickname: string | null;
	worldCupId: number;
};

type SortValue = "playCount" | "createdAt" | "commentCount";

type Comment_list_pageInfo = {
	first: boolean;
	page: number;
	size: number;
	totalElements: number;
	totalPages: number;
	last: boolean;
};

type Comment_list = {
	data: Comment_list_data[];
	pageInfo: Comment_list_pageInfo;
};

type Post_req = {
	title: string;
	description: string;
	password: string | null;
};
type Post_res = {
	id: number;
	title: string;
	description: string;
	password: string | null;
	memberId: number;
};

type Search_Image = {
	data: string[];
	pageInfo: {
		first: boolean;
		page: number;
		size: number;
		totalElements: number;
		totalPages: number;
		last: boolean;
	};
};

type Save_data = {
	id?: number;
	name: string;
	image: string;
	thumb: string;
	worldCupId: number;
	finalWinCount?: number;
	winCount?: number;
	matchUpWorldCupCount?: number;
	matchUpGameCount?: number;
};

type Imgbb_result = {
	data: {
		id: string;
		title: string;
		url_viewer: string;
		url: string;
		display_url: string;
		height: number;
		width: number;
		image: {
			extension: string;
			filename: string;
			mime: string;
			name: string;
			url: string;
		};
		medium: {
			extension: string;
			filename: string;
			mime: string;
			name: string;
			url: string;
		};
		thumb: {
			extension: string;
			filename: string;
			mime: string;
			name: string;
			url: string;
		};

		size: number;
	};
	status: number;
	success: boolean;
};

type Sort_buttons = {
	name: string;
	value: SortValue;
};

export type {
	Candidate,
	Comment_list,
	Comment_list_data,
	Comment_list_pageInfo,
	Contestant,
	Imgbb_result,
	IngameModalData,
	MainWorldcup,
	PageInfo,
	Post_req,
	Post_res,
	Rank_Data,
	Rank_res,
	Rank_res_data,
	Rank_res_pageInfo,
	Result_data,
	Round,
	Save_data,
	Search_Image,
	SortValue,
	Sort_buttons,
	WorldcupsResponse
};
