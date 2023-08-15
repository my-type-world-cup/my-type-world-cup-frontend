import { fetchUserData, get_refresh } from "@/api/user";

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
export { fetcher, fetcherPost, fetcherToken };
