import Modal from "@/components/game/Modal";
import { useEffect, useState } from "react";
type Contestant = {
  name: string;
  image: string;
};

type Match = {
  winner: Contestant;
  loser: Contestant;
};

const initialContestants: Contestant[] = [
  {
    name: "1번",
    image:
      "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/22/b7903101-048a-4375-bfcd-de61d3e70274.jpg",
  },
  {
    name: "2번",
    image:
      "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/22/b7903101-048a-4375-bfcd-de61d3e70274.jpg",
  },
  {
    name: "3번",
    image:
      "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/22/b7903101-048a-4375-bfcd-de61d3e70274.jpg",
  },
  {
    name: "4번",
    image:
      "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/22/b7903101-048a-4375-bfcd-de61d3e70274.jpg",
  },
  {
    name: "5번",
    image:
      "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/22/b7903101-048a-4375-bfcd-de61d3e70274.jpg",
  },
  {
    name: "6",
    image:
      "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/22/b7903101-048a-4375-bfcd-de61d3e70274.jpg",
  },
  {
    name: "7777777777777777777",
    image:
      "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/22/b7903101-048a-4375-bfcd-de61d3e70274.jpg",
  },
  {
    name: "8888888",
    image:
      "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/22/b7903101-048a-4375-bfcd-de61d3e70274.jpg",
  },
  {
    name: "99999999999",
    image:
      "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/22/b7903101-048a-4375-bfcd-de61d3e70274.jpg",
  },
  {
    name: "101010101010101010",
    image:
      "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/22/b7903101-048a-4375-bfcd-de61d3e70274.jpg",
  },
  {
    name: "11111111111",
    image:
      "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/22/b7903101-048a-4375-bfcd-de61d3e70274.jpg",
  },
  {
    name: "12121212",
    image:
      "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/22/b7903101-048a-4375-bfcd-de61d3e70274.jpg",
  },
];

//40명이 있다면 2명을 뽑음
//32강 너무 헤비?
//32강이면 총 16번을 뽑고
//승자는 저장 패자는 삭제
//-2 해주면서 체킹
//백업으로 저장
type Option = {
  label: string;
  value: string;
};
export type round = 32 | 16 | 8 | 4;

const options: Option[] = [
  { label: "인기순", value: "popular" },
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "like" },
  { label: "댓글순", value: "comment" },
];
// 수적으면 제한되는 로직 생성해야함
const WorldCup = () => {
  const [isModal, setIsModal] = useState<[boolean, round]>([true, 32]);
  const [contestants, setContestants] =
    useState<Contestant[]>(initialContestants);
  const [twoPeople, setTwoPeople] = useState<Contestant[]>([]);

  console.log(twoPeople);
  useEffect(() => {
    let randomIndex1, randomIndex2;
    do {
      randomIndex1 = Math.floor(Math.random() * initialContestants.length);
      randomIndex2 = Math.floor(Math.random() * initialContestants.length);
    } while (randomIndex1 === randomIndex2);
    setTwoPeople([
      initialContestants[randomIndex1],
      initialContestants[randomIndex2],
    ]);
  }, []);
  const playMatch = (match: Match) => {};

  const playRound = () => {
    // const newContestants = [...contestants];
    // const newMatches: Match[] = [];
    // for (let i = 0; i < newContestants.length; i += 2) {
    //   const match: Match = {
    //     winner: newContestants[i],
    //     loser: newContestants[i + 1],
    //   };
    //   newMatches.push(match);
    // }
    // setContestants([]);
    // setMatches([...matches, ...newMatches]);
    // setRound(round + 1);
  };

  const reset = () => {
    // setContestants(initialContestants);
    // setMatches([]);
    // setRound(1);
  };
  console.log(isModal);
  return (
    <div className="relative h-screen shadow-lg ">
      <div className="bg-sweetBlack w-full h-full">
        <h2 className="pt-20 text-white text-xl text-center">{isModal[1]}강</h2>
      </div>
      <div
        className="absolute top-0 left-0 w-full h-screen bg-black opacity-70 z-10"
        style={{
          opacity: isModal[0] ? "0.7" : "0",

          transform: isModal[0] ? "translate-x-0" : "translate-x-full",
          transition: "opacity 0.3s ease-in-out",
          pointerEvents: isModal[0] ? "auto" : "none",
        }}
      />

      {isModal[0] && <Modal isModal={isModal} setIsModal={setIsModal} />}
    </div>
  );
};
//검은색 고려할것

export default WorldCup;
