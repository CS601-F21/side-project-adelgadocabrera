import { NextApiRequest, NextApiResponse } from "next";
import Prisma from "../../db/prisma";
import { success, failure } from "../../db/response";
import IBadge from "../../db/badge";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") return await doGet(req, res);
  if (req.method == "POST") return await doPost(req, res);
  if (req.method == "DELETE") return await doDelete(req, res);

  return res.status(404).json(failure("Wrong endpoint"));
}

async function doGet(req: NextApiRequest, res: NextApiResponse) {
  const badges = await getBadges();
  if (badges) {
    res.status(200).json(success(badges));
  } else {
    res.status(500).json(failure("Something went wrong retrieving badges"));
  }
}

async function doPost(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);
  const newBadge = await createUserBadge(body);
  if (newBadge) {
    res.status(200).json(success(newBadge));
    return;
  }

  return res.status(500).json(failure("Oops! Something went wrong"));
}

async function doDelete(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);
  const newBadge = await deleteUserBadge(body);
  if (newBadge) {
    res.status(200).json(success(newBadge));
    return;
  }

  return res.status(500).json(failure("Oops! Something went wrong"));
}

export async function getBadges() {
  return await Prisma.badge.findMany();
}

interface BadgeBody {
  name: string;
  userId: number;
}

async function createUserBadge(body: BadgeBody) {
  return await Prisma.badge.create({
    data: {
      name: body.name,
      userId: body.userId,
    },
  });
}

async function deleteUserBadge(badge: IBadge) {
  return await Prisma.badge.delete({
    where: {
      id: badge.id,
    },
  });
}

export const createBadgesForPost = async (postId: number, badges: string[]) => {
  return await Prisma.badge.createMany({
    data: badges.map((b) => ({
      postId,
      name: b,
    })),
  });
};
