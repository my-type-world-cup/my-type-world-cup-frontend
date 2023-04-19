import Image from "next/image";

const Cards = () => {
  return (
    <article className="border-main mt-4 mx-4 border-[1px]">
      <div className="flex">
        <Image
          src="https://img.sbs.co.kr/newsnet/etv/upload/2023/03/09/30000831348_1280.jpg"
          alt="연예인 사진"
          width={175}
          height={160}
          priority
        />

        <Image
          src="/icon/jpgEx.jpg"
          alt="1st"
          width={175}
          height={160}
          priority
        />
      </div>
      하이
    </article>
  );
};

export default Cards;
//고화질 사진쓰기
//1,2위 이미지, 제목, 설명
// 시작하기, 랭킹보기, 공유 버튼
