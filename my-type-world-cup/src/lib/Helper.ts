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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const fetcherPost = (url: string, data: any) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export { getInitialRound, fetcher, fetcherPost };
