import type { Round } from "@/type/Types";

//라운드 수
// 10명일 경우 8명 반환
// 18명일 경우 16명 반환
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

//경과 시간 변경 함수
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

export { getInitialRound, getTimeDiffString };
