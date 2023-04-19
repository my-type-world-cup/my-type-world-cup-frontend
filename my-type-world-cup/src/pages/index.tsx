import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className="bg-main">
        <Image
          src="/icon/finger.svg"
          alt="Vercel Logo"
          className="dark:invert"
          width={30}
          height={10}
          priority
        />
        <Image
          src="/icon/hambuger.svg"
          alt="Vercel Logo"
          className="dark:invert"
          width={30}
          height={10}
          priority
        />
      </header>
    </main>
  );
}
