"use client";

import { FaRegStar, FaStar } from "react-icons/fa6";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const FavoriteOrNotStar = ({ symbol, userId, isFavorite }: { symbol: string; userId: string; isFavorite: boolean }) => {
  const router = useRouter();

  const variants = {
    initial: { scale: 0.9 },
    animate: { scale: 1.0 },
    whileTap: {
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 5,
        mass: 0.5,
      }
    },
    whileHover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 5,
        mass: 0.5,
      }
    },
  };

  const handleFavoriteClick = async () => {
    await axios.post('/api/toggle-favorite', { symbol, userId });
    router.refresh(); // Refreshing the page to update the favorite status
  };

  return (
    <motion.p onClick={handleFavoriteClick} className="cursor-pointer" variants={variants} initial="initial" animate="animate" whileTap="whileTap" whileHover="whileHover">
      {isFavorite ? <FaStar className="text-yellow-500" /> : <FaRegStar className="text-yellow-500" />}
    </motion.p>
  );
};

export default FavoriteOrNotStar;
