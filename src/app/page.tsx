import { Link } from 'next-view-transitions'


export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div>
        <p>General Kenobi!</p>
        <Link href='/about'>Go to /about</Link>
      </div>
    </main>
  );
}