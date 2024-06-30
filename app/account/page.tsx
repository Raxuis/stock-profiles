import { currentUser } from "@/auth/current-user";
import { Progress } from "@/components/ui/progress";
import { prisma } from "@/prisma";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MAX_USER_QUERIES } from "@/constants/maxUserQueries";

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
    take: 10
  });

  return (
    <>
      <p className="text-center text-3xl mt-6 sm:mt-10">Welcome {user!.name}!</p>
      <p>You've done {userQueriesCount} / {MAX_USER_QUERIES} {userQueriesCount <= 1 ? "query" : "queries"}!</p>
      {userQueriesCount >= MAX_USER_QUERIES && (
        <p className="text-center text-sm">
          You have reached the limit of {MAX_USER_QUERIES} queries. Please subscribe to our PREMIUM plan.
        </p>
      )}
      <Progress value={
        userQueriesCount
      } max={MAX_USER_QUERIES} />
      <Table>
        <TableCaption>Your 10 last queries.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead className="text-right">Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userQueries.map((query) => (
            <TableRow key={query.symbol}>
              <TableCell className="font-medium">{query.symbol}</TableCell>
              <TableCell className="text-right">{query.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
