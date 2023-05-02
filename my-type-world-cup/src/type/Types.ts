type Candidate = {
  id: number;
  name: string;
  image: string;
};

type Worldcup = {
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
  data: Worldcup[];
  pageInfo: PageInfo;
};

export type { WorldcupsResponse };
