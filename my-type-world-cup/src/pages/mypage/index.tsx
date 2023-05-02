import Image from "next/image";
type Props = {};

export default function index({}: Props) {
  return (
    <main className="h-auto shadow-lg -mt-16">
      <div className="flex justify-center items-center flex-col mt-24">
        <Image src="/icon/whale.svg" alt="one" width={100} height={250} />
        <h3 className="text-xl mt-4">Gorae를 이용해주셔서 감사합니다</h3>
      </div>

      <form className="mt-20 mx-8 text-lg flex flex-col">
        <label htmlFor="name">닉네임 😊</label>
        <input
          type="name"
          className="border-b-[1px] border-main text-gray mt-4"
          placeholder="닉네임을 입력해주세요"
        />
        <br />

        <label htmlFor="email">이메일 ✉</label>
        <input
          type="email"
          className="border-b-[1px] border-main text-gray mt-4"
          placeholder="이상형 월드컵의 제목을 입력해주세요"
        />
        {/* 회원탈퇴버튼 */}
        <div className="flex justify-end mt-8 mb-12  text-main mr-4 font-light">
          <button type="submit">회원탈퇴</button>
        </div>

        <button
          type="submit"
          className="rounded-3xl bg-main h-12 text-white sm:mt-12 mx-8 mb-20 hover:bg-inputHover"
        >
          저장하기
        </button>
        <div className="sm:h-[190px]"></div>
      </form>
    </main>
  );
}
