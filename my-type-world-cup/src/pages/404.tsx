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
		<div className="h-screen flex flex-col justify-center items-center">
			<div className="text-center">
				<h1 className="text-4xl mb-4">404 - Page Not Found</h1>
				<p className="mb-2">페이지를 찾을 수 없습니다.</p>
				<p className="mb-2">2초 후에 홈으로 돌아갑니다.</p>
				<p>
					<Link href="/">
						<a className="text-blue-500 hover:underline">
						이 곳을 누르면 바로 넘어갑니다.
						</a>
					</Link>
				</p>
			</div>
		</div>
	);
}
