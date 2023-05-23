import { IMGBB_KEY, IMGBB_URL } from "./../config";

async function fetchImage(url: string): Promise<string> {
  try {
    const response: Response = await fetch(url);
    const blob: Blob = await response.blob();

    return new Promise<string>((resolve, reject) => {
      const reader: FileReader = new FileReader();

      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    throw new Error("이미지를 가져오는 동안 오류가 발생했습니다: " + error);
  }
}
// URL을 Base64 인코딩된 이미지로 변환하기
async function convertToBase64(url: string): Promise<string> {
  try {
    const base64Data = await fetchImage(url);

    return base64Data;
  } catch (error) {
    console.error("이미지를 가져오는 동안 오류가 발생했습니다:", error);
    throw error;
  }
}
function uploadImageToServer(imgSrc: string) {
  const formData = new FormData();
  formData.append("image", imgSrc);
  formData.append("key", IMGBB_KEY);

  return fetch(IMGBB_URL, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return res; // Return the response if needed
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

function blobToServer(imgSrc: string) {
  return fetch(imgSrc)
    .then((response) => response.blob())
    .then((blob) => {
      const formData = new FormData();
      formData.append("image", blob);
      formData.append("key", IMGBB_KEY);

      return fetch(IMGBB_URL, {
        method: "POST",
        body: formData,
      });
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return res; // Return the response if needed
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

export { convertToBase64, uploadImageToServer, blobToServer };
