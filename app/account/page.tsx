import { currentUser } from "@/auth/current-user";
import { Progress } from "@/components/ui/progress";
import { prisma } from "@/prisma";

export default async function Home() {
  const user = await currentUser();

  const MAXUSERQUERIES = 100;
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
      <p>You've done {userQueriesCount} / {MAXUSERQUERIES} {userQueriesCount <= 1 ? "query" : "queries"}!</p>
      {userQueriesCount >= MAXUSERQUERIES && (
        <p className="text-center text-sm">
          You have reached the limit of {MAXUSERQUERIES} queries. Please subscribe to our PREMIUM plan.
        </p>
      )}
      <Progress value={
        userQueriesCount
      } max={MAXUSERQUERIES} />
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
