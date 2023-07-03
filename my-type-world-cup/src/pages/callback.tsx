type Props = {};

function getAccessToken() {
  const name = "AccessToken=";
  const decodedCookie = decodeURIComponent(document.cookie);

  const cookies = decodedCookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

export default function callback({}: Props) {
  return <div className="mt-40">callback</div>;
}
