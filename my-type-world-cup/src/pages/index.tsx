import SearchBar from "@/components/ui/SearchBar";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className="flex h-screen flex-col ">
      안녕
      <SearchBar isOpen={isOpen} setIsOpen={setIsOpen} />
    </main>
  );
}
