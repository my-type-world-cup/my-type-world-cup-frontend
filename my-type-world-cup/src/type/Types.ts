type Candidate = {
  id: number;
  name: string;
  image: string;
};

type result_data = {
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
};

type rank_Data = {
  worldCupId: number;
  password: string | null;
};

type rank_res = {
  data: rank_res_data[];
  pageInfo: rank_res_pageInfo;
};

type rank_res_data = {
  id: number;
  name: string;
  image: string;
  finalWinCount: number;
  winCount: number;
  matchUpWorldCupCount: number;
  matchUpGameCount: number;
  worldCupId: number;
};

type rank_res_pageInfo = {
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

type Post_worldcup = {
  title: string;
  description: string;
  password: string | null;
  candidatePostDtos: Array<{
    name: string;
    image: string;
    thumb: string;
  }>;
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

type Base64 = {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
  };
  status: number;
  success: boolean;
};

export type {
  Search_Image,
  Comment_list,
  Comment_list_data,
  Comment_list_pageInfo,
  rank_Data,
  rank_res,
  rank_res_data,
  rank_res_pageInfo,
  Contestant,
  Round,
  WorldcupsResponse,
  MainWorldcup,
  Candidate,
  PageInfo,
  Post_worldcup,
  IngameModalData,
  result_data,
};
