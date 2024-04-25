import Link from "next/link";


export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div>
        <Link href='/about'>Go to /about</Link>
      </div>
    </main>
  );
}