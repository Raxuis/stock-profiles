"use server";
import { currentUser } from "@/auth/current-user";
import { prisma } from "@/prisma";
import { QueryType } from "@prisma/client";

export default async function createQuery(symbol: string, type: QueryType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.query.create({
    data: {
      userId: user.id,
      type: type,
      symbol: symbol
    }
  });
}
