import { fetchUserData, get_refresh } from "@/api/user";
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
	await fetch(url, {
		headers: {
			"Cache-Control": "max-age=3600" // 1시간 동안 캐시를 유지합니다.
		}
	}).then((res) => res.json());

const fetcherPost = async (url: string, Candidatedata: any, token?: string) => {
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "max-age=3600",
				...(token && { Authorization: `Bearer ${token}` })
			},
			body: JSON.stringify(Candidatedata)
		});
		if (response.status === 401) {
			// 토큰이 만료되었을 때
			const refreshedToken = await get_refresh(); // refresh 토큰 요청
			// refresh 토큰을 사용하여 다시 요청
			return fetchUserData(refreshedToken.data as string);
		} else if (!response.ok) {
			throw response.status;
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const fetcherToken = async (url: string, token: string | null = null) => {
	try {
		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "max-age=3600",
				...(token && { Authorization: `Bearer ${token}` })
			}
		});
		if (response.status === 401) {
			// 토큰이 만료되었을 때
			const refreshedToken = await get_refresh(); // refresh 토큰 요청
			// refresh 토큰을 사용하여 다시 요청
			return fetchUserData(refreshedToken.data as string);
		} else if (!response.ok) {
			throw response.status;
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const getAccessTokenFromLocalStorage = (): string => {
	return localStorage.getItem("access_token") || "실패";
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
	fetcher,
	fetcherPost,
	fetcherToken,
	getAccessTokenFromLocalStorage,
	getInitialRound,
	getTimeDiffString
};
