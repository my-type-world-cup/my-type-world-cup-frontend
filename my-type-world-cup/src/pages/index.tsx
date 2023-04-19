import SearchBar from "@/components/main/SearchBar";
import SortButtons from "@/components/main/SortButtons";
import { useState } from "react";
export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <main className="flex h-screen flex-col ">
      안녕
      <SearchBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <SortButtons />
    </main>
  );
}
