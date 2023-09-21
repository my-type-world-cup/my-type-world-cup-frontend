import type { User } from "@/lib/atom/atom";
import type {
  Comment_list_data,
  Contestant,
  Post_req,
  Post_res,
  Result_data,
  Save_data,
  Save_worldcupType
} from "@/type/Types";
import { MutableRefObject } from "react";
import { BACK_URL } from "../lib/config";

const MEMBERS_URL = `${BACK_URL}/members`;
const WORLDCUPS_URL = `${BACK_URL}/worldcups`;
const CANDIDATES_URL = `${BACK_URL}/candidates`;

// 사용자 데이터를 가져오는 함수
export async function fetchUserData(
  accessToken: string,
  retryCount: number = 0
): Promise<User> {
  try {
    const response = await fetch(MEMBERS_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (response.status === 401) {
      // 토큰이 만료되었을 때
      if (retryCount >= 3) {
        throw new Error("토큰을 갱신할 수 없습니다.");
      }
      const refreshedToken = await get_refresh(); // refresh 토큰 요청
      // refresh 토큰을 사용하여 다시 요청
      return fetchUserData(refreshedToken.data as string, retryCount + 1);
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

// 사용자 닉네임을 수정하는 함수
export async function patchMember(
  accessToken: string,
  nickname: string,
  retryCount: number = 0
): Promise<User> {
  try {
    const response = await fetch(MEMBERS_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ nickname: nickname })
    });

    if (response.status === 401) {
      // 토큰이 만료되었을 때
      if (retryCount >= 3) {
        throw new Error("토큰을 갱신할 수 없습니다.");
      }
      const refreshedToken = await get_refresh(); // refresh 토큰 요청
      // refresh 토큰을 사용하여 다시 요청
      return patchMember(refreshedToken.data, nickname, retryCount + 1);
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

// 월드컵을 생성하는 함수
export async function post_worldcup(
  accessToken: string,
  worldCup: Post_req,
  retryCount: number = 0
): Promise<Post_res> {
  try {
    const response = await fetch(WORLDCUPS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(worldCup)
    });

    if (response.status === 401) {
      // 토큰이 만료되었을 때
      if (retryCount >= 3) {
        throw new Error("토큰을 갱신할 수 없습니다.");
      }
      const refreshedToken = await get_refresh(); // refresh 토큰 요청
      // refresh 토큰을 사용하여 다시 요청
      return post_worldcup(refreshedToken.data, worldCup, retryCount + 1);
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

// 월드컵을 수정하는 함수
export async function patch_worldcup(
  accessToken: string,
  worldCup: Post_req,
  id: number,
  retryCount: number = 0
): Promise<Post_res> {
  try {
    const response = await fetch(`${WORLDCUPS_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(worldCup)
    });

    if (response.status === 401) {
      // 토큰이 만료되었을 때
      if (retryCount >= 3) {
        throw new Error("토큰을 갱신할 수 없습니다.");
      }
      const refreshedToken = await get_refresh(); // refresh 토큰 요청
      // refresh 토큰을 사용하여 다시 요청
      return patch_worldcup(refreshedToken.data, worldCup, id, retryCount + 1);
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

//Pacth,Post 분기 처리 함수
export async function save_worldcup(
  type: Save_worldcupType,
  accessToken: string,
  post_body: Post_req,
  worldcupId: number | null = null
): Promise<Post_res | null> {
  try {
    const res: Post_res | null =
      type === "new"
        ? await post_worldcup(accessToken, post_body)
        : worldcupId !== null
        ? await patch_worldcup(accessToken, post_body, worldcupId)
        : null;
    if (!res) throw new Error("worldcupId is null");

    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// 월드컵을 삭제하는 함수
export async function delete_worldcup(
  accessToken: string,
  id: number,
  retryCount: number = 0
): Promise<Response> {
  try {
    const response = await fetch(`${WORLDCUPS_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (response.status === 401) {
      // 토큰이 만료되었을 때
      if (retryCount >= 3) {
        throw new Error("토큰을 갱신할 수 없습니다.");
      }
      const refreshedToken = await get_refresh(); // refresh 토큰 요청
      // refresh 토큰을 사용하여 다시 요청
      return delete_worldcup(refreshedToken.data, id, retryCount + 1);
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

// 후보자를 생성하거나 수정하는 함수
export async function post_candidates(
  accessToken: string,
  candidates: Save_data,
  retryCount: number = 0
): Promise<Save_data> {
  try {
    if (candidates.id) {
      return await patch_candidates(accessToken, candidates);
    } else {
      const response = await fetch(CANDIDATES_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(candidates)
      });

      if (response.status === 401) {
        // 토큰이 만료되었을 때
        if (retryCount >= 3) {
          throw new Error("토큰을 갱신할 수 없습니다.");
        }
        const refreshedToken = await get_refresh(); // refresh 토큰 요청
        // refresh 토큰을 사용하여 다시 요청
        return post_candidates(refreshedToken.data, candidates, retryCount + 1);
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

// 후보자를 수정하는 함수
export async function patch_candidates(
  accessToken: string,
  candidates: Save_data,
  retryCount: number = 0
): Promise<Save_data> {
  try {
    const response = await fetch(`${CANDIDATES_URL}/${candidates.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(candidates)
    });

    if (response.status === 401) {
      // 토큰이 만료되었을 때
      if (retryCount >= 3) {
        throw new Error("토큰을 갱신할 수 없습니다.");
      }
      const refreshedToken = await get_refresh(); // refresh 토큰 요청
      // refresh 토큰을 사용하여 다시 요청
      return patch_candidates(refreshedToken.data, candidates, retryCount + 1);
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

// 후보자를 삭제하는 함수
export async function delete_candidates(
  accessToken: string,
  id: number,
  retryCount: number = 0
): Promise<Response> {
  try {
    const response = await fetch(`${CANDIDATES_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (response.status === 401) {
      // 토큰이 만료되었을 때
      if (retryCount >= 3) {
        throw new Error("토큰을 갱신할 수 없습니다.");
      }
      const refreshedToken = await get_refresh(); // refresh 토큰 요청
      // refresh 토큰을 사용하여 다시 요청
      return delete_candidates(refreshedToken.data, id, retryCount + 1);
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

// 리프레시 토큰을 가져오는 함수
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

// 게임 진행시 모달 정보를 가져오는 함수
export async function get_detail(
  id: number,
  accessToken: string,
  retryCount: number = 0
): Promise<Post_res> {
  try {
    const response = await fetch(`${WORLDCUPS_URL}/${id}/details`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log(response);
    if (response.status === 401) {
      // 토큰이 만료되었을 때
      if (retryCount >= 3) {
        throw new Error("토큰을 갱신할 수 없습니다.");
      }
      const refreshedToken = await get_refresh(); // refresh 토큰 요청
      // refresh 토큰을 사용하여 다시 요청
      return get_detail(id, refreshedToken.data, retryCount + 1);
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

// 댓글을 생성하는 함수
export async function post_comment(
  comment: { content: string; worldCupId: number; winner?: string },
  accessToken?: string | null,
  retryCount: number = 0
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

    if (response.status === 401) {
      // 토큰이 만료되었을 때
      if (retryCount >= 3) {
        throw new Error("토큰을 갱신할 수 없습니다.");
      }
      const refreshedToken = await get_refresh(); // refresh 토큰 요청
      // refresh 토큰을 사용하여 다시 요청
      return post_comment(comment, refreshedToken.data, retryCount + 1);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// 댓글을 좋아요 버튼
export async function likes_comment(
  id: number,
  accessToken?: string | null,
  retryCount: number = 0
): Promise<Response> {
  try {
    const response = await fetch(`${BACK_URL}/comments/${id}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` })
      },
      body: JSON.stringify({ commentId: id })
    });

    if (response.status === 401) {
      // 토큰이 만료되었을 때
      if (retryCount >= 3) {
        throw new Error("토큰을 갱신할 수 없습니다.");
      }
      const refreshedToken = await get_refresh(); // refresh 토큰 요청
      // refresh 토큰을 사용하여 다시 요청
      return likes_comment(id, refreshedToken.data, retryCount + 1);
    } else if (!response.ok) {
      throw response.status;
    }

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function cancle_like_comment(
  id: number,
  accessToken?: string | null,
  retryCount: number = 0
): Promise<Response> {
  try {
    const response = await fetch(`${BACK_URL}/comments/${id}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` })
      }
    });

    if (response.status === 401) {
      // 토큰이 만료되었을 때
      if (retryCount >= 3) {
        throw new Error("토큰을 갱신할 수 없습니다.");
      }
      const refreshedToken = await get_refresh(); // refresh 토큰 요청
      // refresh 토큰을 사용하여 다시 요청
      return likes_comment(id, refreshedToken.data, retryCount + 1);
    } else if (!response.ok) {
      throw response.status;
    }

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// 대회 참가자를 무작위로 가져오는 함수
export const fetchContestants = async (
  password: string | null = null,
  teamCount: number = 16,
  id: number,
  matchRef: MutableRefObject<Contestant[]>
): Promise<boolean> => {
  const url = `${WORLDCUPS_URL}/${id}/candidates/random?teamCount=${teamCount}`;
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

// 게임 결과 순위를 업데이트하는 함수
export const Rank_result_fetch = async (
  args: Result_data[]
): Promise<boolean> => {
  const loginRes = await fetch(CANDIDATES_URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(args)
  });

  return loginRes.ok;
};
