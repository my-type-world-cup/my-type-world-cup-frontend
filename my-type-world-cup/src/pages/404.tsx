import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    // 2초 후에 "/" 경로로 리다이렉트
    const timeout = setTimeout(() => {
      router.push("/");
    }, 2000);

    // cleanup 함수에서 timeout clear
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="h-screen ">
      <div className="mt-20">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for cannot be found.</p>
        <p>
          <Link href="/">goback</Link>
        </p>
      </div>
    </div>
  );
}
