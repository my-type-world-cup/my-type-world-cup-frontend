import type { User } from "@/lib/atom/atom";
import type {
	Comment_list_data,
	Contestant,
	Post_req,
	Post_res,
	Save_data
} from "@/type/Types";
import { MutableRefObject } from "react";
import { BACK_URL } from "../lib/config";

export async function fetchUserData(
	accessToken: string
): Promise<User> {
	try {
		const response = await fetch(`${BACK_URL}/members`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
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
		console.log("하이");
		// 에러 처리
		console.log(error);
		throw error; // 필요에 따라 예외를 다시 던지거나 특정 값을 반환할 수 있습니다.
	}
}

export async function patchMember(
	accessToken: string,
	nickname: string
): Promise<User> {
	try {
		const response = await fetch(`${BACK_URL}/members`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify({ nickname: nickname })
		});

		if (response.status === 401) {
			// 토큰이 만료되었을 때
			const refreshedToken = await get_refresh(); // refresh 토큰 요청
			// refresh 토큰을 사용하여 다시 요청
			return patchMember(refreshedToken.data, nickname);
		} else if (!response.ok) {
			throw response.status;
		}

		const data = await response.json();
		return data;
	} catch (error) {
		// 에러 처리
		console.log(error);
		throw error;
	}
}

export async function post_worldcup(
	accessToken: string,
	worldCup: Post_req
): Promise<Post_res> {
	try {
		const response = await fetch(`${BACK_URL}/worldcups`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify(worldCup)
		});

		if (response.status === 401) {
			// 토큰이 만료되었을 때
			const refreshedToken = await get_refresh(); // refresh 토큰 요청
			// refresh 토큰을 사용하여 다시 요청
			return post_worldcup(refreshedToken.data, worldCup);
		} else if (!response.ok) {
			throw response.status;
		}

		const data = await response.json();
		return data;
	} catch (error) {
		// 에러 처리
		console.log(error);
		throw error; // 필요에 따라 예외를 다시 던지거나 특정 값을 반환할 수 있습니다.
	}
}

export async function patch_worldcup(
	accessToken: string,
	worldCup: Post_req,
	id: number
): Promise<Post_res> {
	try {
		const response = await fetch(`${BACK_URL}/worldcups/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify(worldCup)
		});

		if (response.status === 401) {
			// 토큰이 만료되었을 때
			const refreshedToken = await get_refresh(); // refresh 토큰 요청
			// refresh 토큰을 사용하여 다시 요청
			return patch_worldcup(refreshedToken.data, worldCup, id);
		} else if (!response.ok) {
			throw response.status;
		}

		const data = await response.json();
		return data;
	} catch (error) {
		// 에러 처리
		console.log(error);
		throw error; // 필요에 따라 예외를 다시 던지거나 특정 값을 반환할 수 있습니다.
	}
}

export async function delete_worldcup(
	accessToken: string,
	id: number
): Promise<Response> {
	try {
		const response = await fetch(`${BACK_URL}/worldcups/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`
			}
		});

		if (response.status === 401) {
			// 토큰이 만료되었을 때
			const refreshedToken = await get_refresh(); // refresh 토큰 요청
			// refresh 토큰을 사용하여 다시 요청
			return delete_worldcup(refreshedToken.data, id);
		} else if (!response.ok) {
			throw response.status;
		}

		return response;
	} catch (error) {
		// 에러 처리
		console.log(error);
		throw error; // 필요에 따라 예외를 다시 던지거나 특정 값을 반환할 수 있습니다.
	}
}

export async function post_candidates(
	accessToken: string,
	candidates: Save_data
): Promise<Save_data> {
	try {
		if (candidates.id) {
			return await patch_candidates(accessToken, candidates);
		} else {
			const response = await fetch(`${BACK_URL}/candidates`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`
				},
				body: JSON.stringify(candidates)
			});

			if (response.status === 401) {
				// 토큰이 만료되었을 때
				const refreshedToken = await get_refresh(); // refresh 토큰 요청
				// refresh 토큰을 사용하여 다시 요청
				return post_candidates(refreshedToken.data, candidates);
			} else if (!response.ok) {
				throw response.status;
			}

			const data = await response.json();
			return data;
		}
	} catch (error) {
		// 에러 처리
		console.log(error);
		throw error;
	}
}

export async function patch_candidates(
	accessToken: string,
	candidates: Save_data
): Promise<Save_data> {
	try {
		const response = await fetch(
			`${BACK_URL}/candidates/${candidates.id}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`
				},
				body: JSON.stringify(candidates)
			}
		);

		if (response.status === 401) {
			// 토큰이 만료되었을 때
			const refreshedToken = await get_refresh(); // refresh 토큰 요청
			// refresh 토큰을 사용하여 다시 요청
			return patch_candidates(refreshedToken.data, candidates);
		} else if (!response.ok) {
			throw response.status;
		}

		const data = await response.json();

		return data;
	} catch (error) {
		// 에러 처리
		console.log(error);
		throw error;
	}
}

export async function delete_candidates(
	accessToken: string,
	id: number
): Promise<Response> {
	try {
		const response = await fetch(`${BACK_URL}/candidates/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`
			}
		});

		if (response.status === 401) {
			// 토큰이 만료되었을 때
			const refreshedToken = await get_refresh(); // refresh 토큰 요청
			// refresh 토큰을 사용하여 다시 요청
			return delete_candidates(refreshedToken.data, id);
		} else if (!response.ok) {
			throw response.status;
		}

		// 삭제된 후에는 특정 데이터를 반환하지 않으므로 주석 처리합니다.
		// const data = await response.json();
		// return data;
		return response;
	} catch (error) {
		// 에러 처리
		console.log(error);
		throw error;
	}
}

export async function get_refresh(): Promise<{ data: string }> {
	try {
		const response = await fetch(`${BACK_URL}/auth/refresh`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include"
		});

		if (!response.ok) {
			throw response.status;
		}
		const data = await response.json();

		return data;
	} catch (error) {
		// 에러 처리
		console.log(error);
		throw error;
	}
}

export async function get_detail(
	id: number,
	accessToken: string
): Promise<Post_res> {
	try {
		const response = await fetch(
			`${BACK_URL}/worldcups/${id}/details`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		);
		console.log(response);
		if (response.status === 401) {
			// 토큰이 만료되었을 때
			const refreshedToken = await get_refresh(); // refresh 토큰 요청
			// refresh 토큰을 사용하여 다시 요청
			return get_detail(id, refreshedToken.data);
		} else if (!response.ok) {
			throw response.status;
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function post_comments(
	comment: { content: string; worldCupId: number; winner?: string },
	accessToken?: string | null
): Promise<Comment_list_data> {
	try {
		const response = await fetch(`${BACK_URL}/comments`, {
			method: "POST",
			headers: {
				...(accessToken && {
					Authorization: `Bearer ${accessToken}`
				}),
				"Content-Type": "application/json"
			},
			body: JSON.stringify(comment)
		});
		console.log(response);
		if (response.status === 401) {
			// 토큰이 만료되었을 때
			const refreshedToken = await get_refresh(); // refresh 토큰 요청
			// refresh 토큰을 사용하여 다시 요청
			return post_comments(comment, refreshedToken.data);
		} else if (!response.ok) {
			throw response.status;
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export const fetchContestants = async (
	password: string | null = null,
	teamCount: number = 16,
	id: number,
	matchRef: MutableRefObject<Contestant[]>
) => {
	const url = `${BACK_URL}/worldcups/${id}/candidates/random?teamCount=${teamCount}`;
	const bodyData = {
		worldCupId: id,
		password: password
	};
	console.log(bodyData, "데이터");
	const options: RequestInit = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(bodyData)
	};
	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			throw new Error("Failed to fetch contestants");
		}
		const data = await response.json();
		matchRef.current = data;
		console.log(data, "안 데이터");
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};
