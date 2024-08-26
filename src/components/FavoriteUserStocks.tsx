import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const FavoriteUserStocks = ({ favoriteStocks }: { favoriteStocks: string[] }) => {
  if (favoriteStocks.length < 1) {
    return <p className="text-center">No favorite stocks</p>
  }
  return (
    <div>
      <p className="text-center">Your Favorite Stocks</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  )
}

export default FavoriteUserStocks
