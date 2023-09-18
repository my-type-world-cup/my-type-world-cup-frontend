// useMessageAndTimer.ts
import { useState } from "react";

export const useMessageAndTimer = () => {
	const [message, setMessage] = useState<string>("");
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const setMessageAndTimer = (msg: string, timer: number) => {
		setMessage(msg); // 메시지 설정
		setModalVisible(true); // 상태 변경

		setTimeout(() => {
			setModalVisible(false); // 일정 시간 후 상태 복원
		}, timer);
	};

	return { modalVisible, setModalVisible, message, setMessageAndTimer };
};
