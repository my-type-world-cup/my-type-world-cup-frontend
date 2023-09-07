// useMessageAndTimer.ts
import { useState } from "react";

export const useMessageAndTimer = () => {
	const [message, setMessage] = useState<string>("");
	const [isCopied, setIsCopied] = useState<boolean>(false);

	const setMessageAndTimer = (msg: string, timer: number) => {
		setMessage(msg); // 메시지 설정
		setIsCopied(true); // 상태 변경

		setTimeout(() => {
			setIsCopied(false); // 일정 시간 후 상태 복원
		}, timer);
	};

	return { isCopied, setIsCopied, message, setMessageAndTimer };
};
