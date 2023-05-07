type Candidate = {
  id: number;
  name: string;
  image: string;
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
  name: string;
  image: string;
};

export type {
  Contestant,
  Round,
  WorldcupsResponse,
  MainWorldcup,
  Candidate,
  PageInfo,
  IngameModalData,
};
