"use server";
import { prisma } from "@/prisma";
import { currentUser } from "@/auth/current-user";

export async function getUserFavorites() {
  const user = await currentUser();
  if (!user) {
    return [];
  }
  const favoriteStocks = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      favoriteStocks: true,
    },
  });
  return favoriteStocks?.favoriteStocks;
}
