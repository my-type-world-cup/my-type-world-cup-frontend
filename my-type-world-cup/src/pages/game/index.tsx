import Modal from "@/components/game/Modal";
import { useState } from "react";
type Contestant = {
  name: string;
  image: string;
};

type Match = {
  winner: Contestant;
  loser: Contestant;
};

const initialContestants: Contestant[] = [
  { name: "김태리", image: "/images/kim-tae-ri.jpg" },
  { name: "박보영", image: "/images/park-bo-young.jpg" },
  { name: "송혜교", image: "/images/song-hye-kyo.jpg" },
  { name: "전지현", image: "/images/jun-ji-hyun.jpg" },
  { name: "한지민", image: "/images/han-ji-min.jpg" },
  { name: "이성경", image: "/images/lee-sung-kyung.jpg" },
  { name: "김지원", image: "/images/kim-ji-won.jpg" },
  { name: "박신혜", image: "/images/park-shin-hye.jpg" },
  { name: "이영애", image: "/images/lee-young-ae.jpg" },
  { name: "한효주", image: "/images/han-hyo-joo.jpg" },
  { name: "김소현", image: "/images/kim-so-hyun.jpg" },
  { name: "박해일", image: "/images/park-hae-il.jpg" },
  { name: "박서준", image: "/images/park-seo-joon.jpg" },
  { name: "송중기", image: "/images/song-joong-ki.jpg" },
  { name: "유아인", image: "/images/yoo-ah-in.jpg" },
  { name: "정해인", image: "/images/jung-hae-in.jpg" },
];
type Option = {
  label: string;
  value: string;
};

const options: Option[] = [
  { label: "인기순", value: "popular" },
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "like" },
  { label: "댓글순", value: "comment" },
];

const WorldCup = () => {
  const [isOpen, setIsOpen] = useState(true);

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

  return (
    <div className="relative h-screen shadow-lg">
      <div
        className="absolute top-0 left-0 w-full h-screen bg-black opacity-70 z-10"
        style={{
          opacity: isOpen ? "0.7" : "0",

          transform: isOpen ? "translate-x-0" : "translate-x-full",
          transition: "opacity 0.3s ease-in-out",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      />
      <Modal />
    </div>
  );
};
//검은색 고려할것

export default WorldCup;
