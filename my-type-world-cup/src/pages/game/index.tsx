import InGame from "@/components/game/InGame";
import Modal from "@/components/game/Modal";
import { useEffect, useState } from "react";

export type Contestant = {
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
export type Round = 32 | 16 | 8 | 4 | 2;

const options: Option[] = [
  { label: "인기순", value: "popular" },
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "like" },
  { label: "댓글순", value: "comment" },
];

// 수적으면 제한되는 로직 생성해야함
const WorldCup = () => {
  const [isModal, setIsModal] = useState<[boolean, Round]>([true, 16]);
  const [round, setRound] = useState<Number>(0);
  const [contestants, setContestants] =
    useState<Contestant[]>(initialContestants);
  const [twoPeople, setTwoPeople] = useState<Contestant[]>([]);
  const randomIndex = (el: number) => {
    let num = Math.floor(Math.random() * contestants.length);
    while (el === num) {
      num = Math.floor(Math.random() * contestants.length);
    }
    return num;
  };
  // 겹치지 않는 2명을 계속해서 뽑는 법
  const randomContestant = () => {
    const randomIndex1 = Math.floor(Math.random() * contestants.length);
    const randomIndex2 = randomIndex(randomIndex1);
    const randomContestant1 = contestants[randomIndex1];
    const randomContestant2 = contestants[randomIndex2];
    setTwoPeople([randomContestant1, randomContestant2]);
    setContestants(
      contestants.filter(
        (el) => el !== randomContestant1 && el !== randomContestant2
      )
    );
  };

  useEffect(() => {
    setRound(isModal[1]);
  }, [isModal]);
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
  console.log(twoPeople);
  console.log(contestants);
  return (
    <div className="relative h-screen shadow-lg z-50">
      <div className="bg-sweetBlack w-full h-full">
        {!isModal[0] && (
          <InGame
            isModal={isModal}
            twoPeople={twoPeople}
            randomContestant={() => randomContestant()}
          />
        )}
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

      {isModal[0] && (
        <Modal
          isModal={isModal}
          setIsModal={setIsModal}
          randomContestant={() => randomContestant()}
        />
      )}
    </div>
  );
};

export default WorldCup;
