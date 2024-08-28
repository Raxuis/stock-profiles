"use client";

import { useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import axios from "axios";
import { useRouter } from "next/navigation";

const FavoriteOrNotStar = ({ symbol, userId, isFavorite }: { symbol: string; userId: string; isFavorite: boolean }) => {
  const router = useRouter();

  const handleFavoriteClick = async () => {
    await axios.post('/api/toggle-favorite', { symbol, userId });
    router.refresh(); // Refreshing the page to update the favorite status
  };

  return (
    <p onClick={handleFavoriteClick} className="cursor-pointer">
      {isFavorite ? <FaStar className="text-yellow-500" /> : <FaRegStar className="text-yellow-500" />}
    </p>
  );
};

export default FavoriteOrNotStar;
