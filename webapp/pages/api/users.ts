import { NextApiRequest, NextApiResponse } from "next";
import Prisma from "../../db/prisma";
import { success, failure } from "../../db/response";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    const users = await getUsers();
    if (users) {
      res.status(200).json(success(users));
    } else {
      res.status(500).json(failure("Oops! Something went wrong"));
    }
  } else if (req.method == "PUT") {
    const updatedUser = await updateUser(req);
    if (updatedUser) {
      res.status(200).json(success(updatedUser));
    } else {
      res.status(500).json(failure("Something went wrong updating user"));
    }
  } else {
    res.status(400).json({
      error: "400 BAD REQUEST",
    });
  }
}

async function updateUser(req: NextApiRequest) {
  const body = JSON.parse(req.body);
  const name: string = body.name;
  return await Prisma.user.update({
    where: {
      name,
    },
    data: {
      ...body,
    },
  });
}

export async function getUserByName(name: string) {
  return await Prisma.user.findUnique({
    where: {
      name,
    },
  });
}

export async function getUserById(id: number) {
  return await Prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      posts: {
        include: {
          badges: true,
        },
      },
      badges: true,
    },
  });
}

export async function getUsers() {
  return await Prisma.user.findMany({
    include: {
      badges: {
        select: {
          id: true,
          name: true,
          years: true,
        },
      },
    },
  });
}
