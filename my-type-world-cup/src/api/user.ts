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
