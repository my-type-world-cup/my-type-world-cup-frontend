import InGame from "@/components/game/InGame";
import Modal from "@/components/game/Modal";
import Result from "@/components/game/Result";
import { useEffect, useRef, useState } from "react";
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
      "data:image/jpeg;base64,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",
  },
  {
    name: "2번",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxR3v4QBlbTY0Irx7zjXjXzAQGanPmYjYyuw&usqp=CAU",
  },
  {
    name: "3번",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu2-AmFTnKiSdDhsGI1A8IW-l987-QwOmWBw&usqp=CAU",
  },
  {
    name: "4번",
    image:
      "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/22/b7903101-048a-4375-bfcd-de61d3e70274.jpg",
  },
  // {
  //   name: "5번",
  //   image:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo5mL_70gtLyr9PiSno7qELAqSVed-AEmszQ&usqp=CAU",
  // },
  // {
  //   name: "6",
  //   image:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA5iu28--weHfscZPb5YzVrO3i-Y1jHJhNSQ&usqp=CAU",
  // },
  // {
  //   name: "7777777777777777777",
  //   image:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkrJv40k36-sVYiItfL03cmAkO9L26J6kUmQ&usqp=CAU",
  // },
  // {
  //   name: "8888888",
  //   image:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWJCk4j3xw8uqmAioEdmObXOwoETMOByTu31SisZjtT--0_QV4pKBtxePrsR0x5XV4BNg&usqp=CAU",
  // },
  // {
  //   name: "99999999999",
  //   image:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtCOfv35R30lE3TaxA49lcLIxz89usOVdrHA&usqp=CAU",
  // },
  // {
  //   name: "101010101010101010",
  //   image:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIziWrNvg-UJo4z3QM_sfHkvySQcsTyfhWrA&usqp=CAU",
  // },
  // {
  //   name: "11111111111",
  //   image:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtVHRXVTgoTWUPAmGP2Aj8P4wC1J262PPRWw&usqp=CAU",
  // },
  // {
  //   name: "12121212",
  //   image:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU4-uYiuIOu4pLY4KzoGUEkugLQQf3_3pbBg&usqp=CAU",
  // },
];

//40명이 있다면 2명을 뽑음
//32강 너무 헤비?
//32강이면 총 16번을 뽑고s
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
  const [isCheck, setIsCheck] = useState<[boolean, number]>([true, 3]); //3은 초기화//4는 끝
  // const [contestants, setContestants] =
  //   useState<Contestant[]>(initialContestants);
  const matchRef = useRef<Contestant[]>(initialContestants);
  const [twoPeople, setTwoPeople] = useState<Contestant[]>([]);
  // const [winner, setWinner] = useState<Contestant[]>([]);
  const winnerRef = useRef<Contestant[]>([]);

  const randomIndex = (el: number, length: number) => {
    let num = Math.floor(Math.random() * length);
    while (el === num) {
      num = Math.floor(Math.random() * length);
    }
    return num;
  };
  // 겹치지 않는 2명을 계속해서 뽑는 법
  // 새로운 배열로 업데이트가 되지않음
  const randomContestant = () => {
    console.log(winnerRef.current, "안 위너", matchRef.current, "안 매치");
    const randomIndex1 = Math.floor(Math.random() * matchRef.current.length);
    const randomIndex2 = randomIndex(randomIndex1, matchRef.current.length);

    const randomContestant1 = matchRef.current[randomIndex1];
    const randomContestant2 = matchRef.current[randomIndex2];
    setTwoPeople([randomContestant1, randomContestant2]);
    matchRef.current = matchRef.current.filter(
      (el) => el !== randomContestant1 && el !== randomContestant2
    );
    console.log(matchRef.current, "안후 매치");
    // setContestants((el: Contestant[]) => {
    //   return el.filter(
    //     (el) => el !== randomContestant1 && el !== randomContestant2
    //   );
    // });
  };

  useEffect(() => {
    setRound(isModal[1]);
  }, [isModal]);
  console.log(isCheck, "안 엔드");
  return (
    <div className="h-auto shadow-lg">
      {isCheck[1] !== 4 && (
        <div className="relative h-screen shadow-lg z-50">
          <div className="bg-sweetBlack w-full h-full overflow-hidden">
            {!isModal[0] && (
              <InGame
                isModal={isModal}
                twoPeople={twoPeople}
                randomContestant={() => randomContestant()}
                winnerRef={winnerRef}
                matchRef={matchRef}
                isCheck={isCheck}
                setIsCheck={setIsCheck}
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
      )}
      {isCheck[1] === 4 && (
        <>
          <Result winnerRef={winnerRef} />
        </>
      )}
    </div>
  );
};

export default WorldCup;

//두가지 쿠션으로 생각해보자
