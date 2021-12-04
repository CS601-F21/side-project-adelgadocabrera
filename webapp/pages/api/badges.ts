import Prisma from "../../db/prisma";

export const createBadgesForPost = async (postId: number, badges: string[]) => {
  return await Prisma.badge.createMany({
    data: badges.map((b) => ({
      postId,
      name: b,
    })),
  });
};
