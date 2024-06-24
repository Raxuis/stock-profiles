import { currentUser } from "@/auth/current-user";
import { Progress } from "@/components/ui/progress";
import { prisma } from "@/prisma";

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    return <p className="text-center text-3xl">Please sign in</p>;
  }

  const userQueriesCount = await prisma.query.count({
    where: {
      userId: user.id,
    },
  });

  const userQueries = await prisma.query.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <p className="text-center text-3xl">Welcome {user!.name}!</p>
      <p>You've done {userQueriesCount} {userQueriesCount <= 1 ? "query" : "queries"}!</p>
      <Progress value={
        userQueriesCount
      } max={100} />
      <ul>
        {userQueries.map((query) => (
          <li key={query.id}>
            <p>{query.symbol} | Type : {query.type}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
