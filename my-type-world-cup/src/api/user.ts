import type { Post_req, Save_data } from "@/type/Types";
import { BACK_URL } from "../lib/config";

export async function fetchUserData(accessToken: string) {
  const response = await fetch(`${BACK_URL}/members`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function patchMember(accessToken: string, nickname: string) {
  const response = await fetch(`${BACK_URL}/members`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ nickname: nickname }),
  });
  const data = await response.json();

  return data;
}

export async function post_worldcup(accessToken: string, worldCup: Post_req) {
  try {
    const response = await fetch(`${BACK_URL}/worldcups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(worldCup),
    });

    if (!response.ok) {
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
) {
  try {
    const response = await fetch(`${BACK_URL}/worldcups/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(worldCup),
    });

    if (!response.ok) {
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

export async function delete_worldcup(accessToken: string, id: number) {
  try {
    const response = await fetch(`${BACK_URL}/worldcups/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);
    if (!response.ok) {
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
) {
  try {
    if (candidates.id) {
      const response = await fetch(`${BACK_URL}/candidates/${candidates.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(candidates),
      });
      console.log(response);
      if (!response.ok) {
        throw response.status;
      }
      const data = await response.json();

      return data;
    } else {
      const response = await fetch(`${BACK_URL}/candidates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(candidates),
      });
      if (!response.ok) {
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
) {
  try {
    const response = await fetch(`${BACK_URL}/candidates/${candidates.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(candidates),
    });
    console.log(response);
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

export async function delete_candidates(accessToken: string, id: number) {
  console.log(id, accessToken);
  try {
    const response = await fetch(`${BACK_URL}/candidates/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);
    if (!response.ok) {
      throw response.status;
    }
    // const data = await response.json();

    // return data;
  } catch (error) {
    // 에러 처리
    console.log(error);
    throw error;
  }
}

export async function post_refresh(accessToken: string) {
  try {
    const response = await fetch(`${BACK_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: document.cookie,
      },
      credentials: "include",
    });
    console.log(response);
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

export async function get_detail(id: number, accessToken: string) {
  try {
    const response = await fetch(`${BACK_URL}/worldcups/${id}/details`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);
    if (!response.ok) {
      throw response.status;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
