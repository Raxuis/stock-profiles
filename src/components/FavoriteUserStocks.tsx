"use client";
import React from 'react';

const FavoriteUserStocks = ({ favoriteStocks }: { favoriteStocks: { symbol: string }[] }) => {
  if (favoriteStocks.length === 0) return <div>No favorite stocks</div>;
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
          {favoriteStocks.map((stock) => (
            <tr key={stock.symbol}>
              <td>- {stock.symbol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FavoriteUserStocks;
