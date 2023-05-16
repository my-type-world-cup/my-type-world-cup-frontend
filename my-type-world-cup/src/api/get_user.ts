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
