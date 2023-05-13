import type { Round } from "@/type/Types";

function getInitialRound(candidatesCount: number): Round {
  const rounds = [4, 8, 16, 32]; // 가능한 라운드 수
  let selectedRound: Round = 16; // 기본값은 16강
  for (let round of rounds) {
    if (candidatesCount >= round) {
      selectedRound = round as Round;
    } else {
      break;
    }
  }
  return selectedRound;
}

const fetcher = async (url: string) =>
  await fetch(url).then((res) => res.json());

const fetcherPost = async (url: string, data: any, token?: string) =>
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

const fetcherToken = async (url: string, token: string | null = null) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  const data = await response.json();
  return data;
};

const fetcherDelete = async (url: string, accessToken?: string) =>
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

const getAccessTokenFromLocalStorage = (): string => {
  return localStorage.getItem("access_token") || "";
};

const getTimeDiffString = (pastTime: string) => {
  const MINUTE = 60 * 1000;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const MONTH = 30 * DAY;

  const now = new Date();
  const targetTime = new Date(pastTime);

  const diff = now.getTime() - targetTime.getTime();

  if (diff < MINUTE) {
    return "방금 전";
  } else if (diff < HOUR) {
    return `${Math.floor(diff / MINUTE)}분 전`;
  } else if (diff < DAY) {
    return `${Math.floor(diff / HOUR)}시간 전`;
  } else if (diff < MONTH) {
    return `${Math.floor(diff / DAY)}일 전`;
  } else {
    return `${Math.floor(diff / MONTH)}달 전`;
  }
};

export {
  fetcherDelete,
  fetcherToken,
  getTimeDiffString,
  getInitialRound,
  fetcher,
  fetcherPost,
  getAccessTokenFromLocalStorage,
};
