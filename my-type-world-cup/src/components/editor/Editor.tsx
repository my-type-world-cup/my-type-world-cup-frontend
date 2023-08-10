import { patch_worldcup, post_worldcup } from "@/api/user";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { accessTokenState, postWorldcup } from "../../lib/atom/atom";
import type { Post_req, Post_res } from "../../type/Types";
import type { Step } from "./TabButton";
interface EditorProps {
	setIsNumber: React.Dispatch<React.SetStateAction<Step>>;
}

const Editor = ({ setIsNumber }: EditorProps) => {
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [isPublic, setIsPublic] = useState<boolean>(true);
	const [password, setPassword] = useState<string | null>(null);
	const [worldcup, setWorldcup] = useRecoilState<Post_res | null>(
		postWorldcup
	);
	const accessToken = useRecoilValue(accessTokenState);
	const [isValid, setIsValid] = useState(true);

	useEffect(() => {
		if (isPublic) setPassword(null);
	}, [isPublic]);

	useEffect(() => {
		if (worldcup !== null) {
			setTitle(worldcup.title);
			setDescription(worldcup.description);
			setIsPublic(worldcup.password === null);
			setPassword(worldcup.password);
		}
	}, [worldcup]);
	const handleSave = () => {
		if (!isPublic && password === null) {
			setIsValid(false);
			return;
		}
		if (accessToken !== null && !!title && !!description) {
			const post_body: Post_req = {
				title: title,
				description: description,
				password: password ? password : null
			};
			if (worldcup === null) {
				post_worldcup(accessToken!, post_body!)
					.then((res) => {
						setWorldcup(res);
						console.log(res);
						setTitle("");
						setDescription("");
						setPassword(null);
						setIsNumber("2");
					})
					.catch((err) => {
						console.log(err);
						// if (err === 401) {
						//   post_refresh();
						//   console.log("로그인 해야해~");
						// }
					});
			} else {
				patch_worldcup(accessToken!, post_body!, worldcup!.id)
					.then((res) => {
						setWorldcup(res);
						console.log(res);
						setTitle("");
						setDescription("");
						setPassword(null);
						setIsNumber("2");
					})
					.catch((err) => {
						console.log(err);
						// if (err === 401) {
						//   post_refresh();
						//   console.log("로그인 해야해~");
						// }
					});
			}
		}
	};

	const handlePublicChange = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setIsPublic(event.target.value === "public");
	};

	const handleReset = () => {
		setTitle("");
		setDescription("");
		setPassword(null);
		setWorldcup(null);
	};

	const handlePasswordChange = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		const inputPassword = event.target.value;
		// 숫자만 입력받도록 유효성 검사
		if (inputPassword.length === 4) {
			setPassword(inputPassword);
			setIsValid(true); // 유효한 입력값인 경우 isValid를 true로 설정
		} else {
			setPassword(inputPassword);
			setIsValid(false); // 유효하지 않은 입력값인 경우 isValid를 false로 설정
		}
	};
	return (
		<div
			className='sm:pt-20 mt-4 sm:mt-8 mx-8 text-lg flex flex-col -pb-20 h-screen'
			// onSubmit={handleSubmit}
		>
			<label htmlFor='title' className=''>
				제목
			</label>
			<input
				type='text'
				className='border-b-[1px] border-main mt-1 pl-2'
				placeholder='이상형 월드컵의 제목을 입력해주세요'
				value={title}
				onChange={(event) => setTitle(event.target.value)}
			/>
			<br />

			<label htmlFor='description' className='pt-8'>
				설명
			</label>
			<textarea
				className='border-[1px] border-main mt-1 outline-none p-2'
				value={description}
				onChange={(event) => setDescription(event.target.value)}
				rows={3}
			/>
			<br />

			{!isPublic && (
				<div className='flex justify-center flex-col pt-4'>
					<label htmlFor='password'>비밀번호</label>
					<input
						type='password'
						className='border-[1px] border-main text-gray mt-2 w-auto p-1 pl-4'
						maxLength={4}
						disabled={isPublic}
						placeholder='비밀번호 4자리를 입력해주세요'
						value={password ? password : ""}
						onChange={handlePasswordChange}
					/>
					{!isValid && (
						<p className='text-error text-sm mt-1'>
							4자리 숫자를 입력해주세요.
						</p>
					)}
				</div>
			)}
			<div className='flex justify-around items-center mt-6'>
				<label className='flex items-center'>
					<input
						type='radio'
						name='public'
						value='public'
						className='mr-3 w-6 h-6'
						checked={isPublic}
						onChange={handlePublicChange}
					/>
					공개
				</label>

				<label className='flex items-center'>
					<input
						type='radio'
						name='public'
						value='private'
						className='mr-3 w-6 h-6'
						checked={!isPublic}
						onChange={handlePublicChange}
					/>
					비공개
				</label>
			</div>
			<button
				type='button'
				onClick={() => handleSave()}
				className='mt-20 px-4 py-2 bg-main text-white rounded-md hover:scale-105 transition-all'>
				저장
			</button>
			<button
				type='button'
				onClick={handleReset}
				className='mt-4 sm:mt-8 px-4 py-2 bg-main text-white rounded-md hover:scale-105 transition-all'>
				새로 만들기
			</button>
		</div>
	);
};
export default Editor;
