import { Post_req } from "@/type/Types";
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
  console.log(data, "호호호호");
  return data;
}

export async function post_worldcup(accessToken: string, worldCup: Post_req) {
  const response = await fetch(`${BACK_URL}/worldcups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(worldCup),
  });
  const data = await response.json();
  console.log(data, "호호호호");
  return data;
}
