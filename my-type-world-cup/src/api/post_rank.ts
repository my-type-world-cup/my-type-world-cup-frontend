import { BACK_URL } from "@/lib/config";
import type { result_data } from "@/type/Types";

export const rank_result_fetch = async (
  args: result_data[]
): Promise<boolean> => {
  const loginRes = await fetch(`${BACK_URL}/candidates`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });

  return loginRes.ok;
};
