import type { Round } from "@/type/Types";

function getInitialRound(candidatesCount: number): Round {
  const rounds = [4, 8, 16, 32]; // 가능한 라운드 수
  let selectedRound: Round = 16; // 기본값은 4강
  for (let round of rounds) {
    if (candidatesCount >= round) {
      selectedRound = round as Round;
    } else {
      break;
    }
  }
  return selectedRound;
}

export { getInitialRound };
