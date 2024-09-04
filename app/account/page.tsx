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
import { MAX_USER_QUERIES } from "@/constants";
import { Separator } from "@/components/ui/separator";
import FavoriteUserStocks from "@/components/FavoriteUserStocks";
import FavoriteOrNotStar from "@/components/FavoriteOrNotStar";

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function formatQueryType(type: string): string {
  return type.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, ''); // Example : Changes StockChart to stock-chart | StockProfile to stock-profile
}

export default async function Account() {
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

  const favoriteStocks = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      favoriteStocks: true,
    },
  });

  const favoriteStockData = favoriteStocks?.favoriteStocks
    ?.filter(isString)
    .map(stock => ({ symbol: stock })) || [];

  const favoriteSymbols = favoriteStockData.map(stock => stock.symbol);

  return (
    <div className="space-y-4 max-sm:mb-20">
      <div className="space-y-4">
        <p className="mt-6 text-center text-3xl sm:mt-10">Welcome {user.name}! 👋</p>
        <p className="text-center">{user.plan === 'FREE' ? 'You have a free account.' : 'You have a premium account.'}</p>
        <p>You&apos;ve done {userQueriesCount} / {MAX_USER_QUERIES} {userQueriesCount <= 1 ? "query" : "queries"}!</p>
        {userQueriesCount >= MAX_USER_QUERIES && (
          <p className="text-center text-sm">
            You have reached the limit of {MAX_USER_QUERIES} queries. Please subscribe to our PREMIUM plan.
          </p>
        )}
      </div>
      <Progress value={userQueriesCount} max={MAX_USER_QUERIES} />
      <Table className="*:cursor-default">
        <TableCaption className="mr-10">Your 10 last queries.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-right">Created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userQueries.map((query, index) => (
            <TableRow key={query.symbol}>
              <TableCell className="flex items-center gap-1 font-medium">
                <div className="flex items-center">
                  {query.symbol} {index === 0 && <span className="font-semibold">(most recent)</span>}
                </div>
                <FavoriteOrNotStar symbol={query.symbol} userId={user.id} isFavorite={favoriteSymbols.includes(query.symbol)} />
              </TableCell>
              <TableCell className="text-center">{formatQueryType(query.type)}</TableCell>
              <TableCell className="text-right">{query.createdAt.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Separator className="my-6" />
      <FavoriteUserStocks favoriteStocks={favoriteStockData} />
    </div>
  );
}
